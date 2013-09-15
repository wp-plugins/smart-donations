<?php



function rednao_smart_donations_json_object($object,$styles,$amount,$goal,$donators)
{
    $json="{";
    $variables=explode("&",$object);
    foreach($variables as $val)
    {
        $variable=explode('=',$val);

        $json=$json."\"$variable[0]\":\"".(count($variable)>1?str_replace("\"","\\\"", urldecode($variable[1])):"")."\",";
    }
    if($styles!=null)
    {
        $json=$json."\"styles\":".rednao_smart_donations_json_object($styles,null,null,null,null).",";
    }

    if($amount!=null)
    {
        $json=$json."\"Amount\":".$amount.",";
    }

    if($goal!=null)
    {
        $json=$json."\"Goal\":".$goal.",";
    }

    if($donators!=null)
    {
        $json=$json."\"Donators\":".$donators.",";
    }





    $json=substr_replace($json ,"",-1);
    $json=$json."}";
    return $json;
}

function rednao_smart_donations_load_donation($id,$title,$returnComponent)
{

    $options=get_transient("rednao_smart_donations_donation_$id");
    $options=false;
    if($options==false)
    {
        global $wpdb;
        $result=$wpdb->get_results($wpdb->prepare("select options,styles,donation_type from ".SMART_DONATIONS_TABLE_NAME." where donation_id=%d",$id));
        if(count($result)>0)
        {
            $result=$result[0];
            $options=$result->options;
            $styles=$result->styles;
            if($options!=null)
            {
                if($result->donation_type=="forms")
                {
                    $options=str_replace("\\\"","\"",$options);
                }else
                {
                    $options=rednao_smart_donations_json_object($options,$styles,null,null,null);
                }
                set_transient("rednao_smart_donations_donation_$id",$options,60*60*24*31);
            }
        }else
            $options="";

    }
    wp_enqueue_script('jquery');
    wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
    wp_enqueue_script('smart-donations-donation-provider',plugin_dir_url(__FILE__).'js/donationProvider.js',array('isolated-slider'));
    wp_enqueue_script('smart-donations-generator',plugin_dir_url(__FILE__).'js/donationGenerator.js',array('isolated-slider','smart-donations-donation-provider'));
    wp_enqueue_script('smart-donations-generator-wepay',plugin_dir_url(__FILE__).'js/donationGenerator_wepay.js',array('smart-donations-generator'));
    wp_enqueue_script('smart-donations-raphael',plugin_dir_url(__FILE__).'js/raphael-min.js',array('isolated-slider'));
    wp_enqueue_script('smart-donations-formelements',plugin_dir_url(__FILE__).'js/formBuilder/formelements.js',array('isolated-slider'));
    wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
    wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');
    echo "<script type=\"text/javascript\">var ajaxurl = '".admin_url('admin-ajax.php')."';</script>";
    $random=rand();

    if($returnComponent==false)
    {
        if($options==null)
            return;

        if($title)
            echo "<div><h3 class='widgettitle'>$title</h3>"

    ?>

    <div id="donationContainer<?php echo $random?>"></div>

    <script>
        var smartDonationsRootPath="<?php echo plugin_dir_url(__FILE__)?>";

        if(!window.smartDonationsItemsToLoad)
            window.smartDonationsItemsToLoad=new Array();;

        window.smartDonationsItemsToLoad.push({'options':<?php echo $options?>,'element':'donationContainer<?php echo $random?>'});

    </script>
<?php
        if($title)
            echo "</div>";

    }else{
        if($options==null)
            return "";
        return "<div id='donationContainer$random'></div>
            <script>
                var smartDonationsRootPath=\"".plugin_dir_url(__FILE__)."\";
                if(!window.smartDonationsItemsToLoad)
                    window.smartDonationsItemsToLoad=new Array();;
                window.smartDonationsItemsToLoad.push({'options':$options,'element':'donationContainer$random'});
            </script>
           ";
    }
}




function rednao_smart_donations_load_progress($id,$title,$returnComponent)
{

    $options=get_transient("rednao_smart_donations_progress_$id");
    if($options==false)
    {
        $options=null;
        global $wpdb;
        $result=$wpdb->get_results($wpdb->prepare("select options,styles,campaign_id from ".SMART_DONATIONS_PROGRESS_TABLE." where progress_id=%d",$id));
        if(count($result)>0)
        {
            $result=$result[0];
            $options=$result->options;
            $styles=$result->styles;
            $campaign_id=$result->campaign_id;
            if($campaign_id==null)
                return "";


            if($campaign_id==0)
                $result=$wpdb->get_results($wpdb->prepare("select coalesce(goal,0) goal,sum(mc_gross) amount,(select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE." where campaign_id=%d) donators
                                                    from ".SMART_DONATIONS_TRANSACTION_TABLE." tran
                                                    left join wp_smart_donations_campaign_table camp
                                                    on tran.campaign_id=camp.campaign_id
                                                    where tran.campaign_id=%d
                                                    group by tran.campaign_id,goal",$campaign_id,$campaign_id));
            else
                $result=$wpdb->get_results($wpdb->prepare("select coalesce(goal,0) goal,sum(mc_gross) amount,(select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE." where campaign_id=%d) donators
                                                    from ".SMART_DONATIONS_CAMPAIGN_TABLE." camp
                                                    left join ".SMART_DONATIONS_TRANSACTION_TABLE." tran
                                                    on tran.campaign_id=camp.campaign_id
                                                    where camp.campaign_id=%d
                                                    group by tran.campaign_id,goal",$campaign_id,$campaign_id));

            $amount=0;
            $goal=0;
            $donators=0;
            if(count($result)>0)
            {
                $amount=$result[0]->amount;
                $goal=$result[0]->goal;
                $donators=$result[0]->donators;
            }

            if($options!=null)
            {
                $options=rednao_smart_donations_json_object($options,$styles,$amount,$goal,$donators);
                set_transient("rednao_smart_donations_progress_$id",$options,60*60*24*31);
            }
        }

    }
    wp_enqueue_script('jquery');
    wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
    wp_enqueue_script('smart-donations-progress-gen',plugin_dir_url(__FILE__).'js/smart-donations-progress-gen.js',array('isolated-slider'));
    wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
    wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');
    $random=rand();

    if($returnComponent==false)
    {
        if($options===null)
            return;

        if($title)
            echo "<div><h3 class='widgettitle'>$title</h3>"
        ?>


        <div id="progressContainer<?php echo $random?>"></div>

        <script>
            var smartDonationsRootPath="<?php echo plugin_dir_url(__FILE__)?>";

            if(!window.smartDonationsProgressItemsToLoad)
                window.smartDonationsProgressItemsToLoad=new Array();;

            window.smartDonationsProgressItemsToLoad.push({'options':<?php echo $options?>,'element':'progressContainer<?php echo $random?>'});

        </script>
    <?php
        if($title)
            echo "</div>";
    }else{
        if(options===null)
            return "";
        return "<div id='progressContainer$random'></div>
            <script>
                var smartDonationsRootPath=\"".plugin_dir_url(__FILE__)."\";
                if(!window.smartDonationsProgressItemsToLoad)
                    window.smartDonationsProgressItemsToLoad=new Array();;
                window.smartDonationsProgressItemsToLoad.push({'options':$options,'element':'progressContainer$random'});
            </script>
           ";
    }
}

?>