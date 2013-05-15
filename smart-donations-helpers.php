<?php



function rednao_smart_donations_json_object($object,$styles)
{
    $json="{";
    $variables=explode("&",$object);
    foreach($variables as $val)
    {
        $variable=explode('=',$val);

        $json=$json."\"$variable[0]\":\"".(count($variable)>1?urldecode($variable[1]):"")."\",";
    }
    if($styles!=null)
    {
        $json=$json."\"styles\":".rednao_smart_donations_json_object($styles,null).",";
    }



    $json=substr_replace($json ,"",-1);
    $json=$json."}";
    return $json;
}

function rednao_smart_donations_load_donation($id,$title,$returnComponent)
{

    $options=get_transient("rednao_smart_donations_donation_$id");
    if($options==false)
    {
        global $wpdb;
        $result=$wpdb->get_results($wpdb->prepare("select options,styles from ".SMART_DONATIONS_TABLE_NAME." where donation_id='$id'"));
        if(count($result)>0)
        {
            $result=$result[0];
            $options=$result->options;
            $styles=$result->styles;
            if($options!=null)
            {
                $options=rednao_smart_donations_json_object($options,$styles);
                set_transient("rednao_smart_donations_donation_$id",$options,60*60*24*31);
            }
        }

    }
    wp_enqueue_script('jquery');
    wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
    wp_enqueue_script('smart-donations-donation-provider',plugin_dir_url(__FILE__).'js/donationProvider.js',array('isolated-slider'));
    wp_enqueue_script('smart-donations-generator',plugin_dir_url(__FILE__).'js/donationGenerator.js',array('isolated-slider','smart-donations-donation-provider'));
    wp_enqueue_script('smart-donations-generator-wepay',plugin_dir_url(__FILE__).'js/donationGenerator_wepay.js',array('smart-donations-generator'));
    wp_enqueue_script('smart-donations-raphael',plugin_dir_url(__FILE__).'js/raphael-min.js',array('isolated-slider'));
    wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
    wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');
    $random=rand();

    if($returnComponent==false)
    {
        if($options===null)
            return;
    ?>
    <div id="donationContainer<?php echo $random?>"></div>

    <script>
        var smartDonationsRootPath="<?php echo plugin_dir_url(__FILE__)?>";

        if(!window.smartDonationsItemsToLoad)
            window.smartDonationsItemsToLoad=new Array();;

        window.smartDonationsItemsToLoad.push({'options':<?php echo $options?>,'element':'donationContainer<?php echo $random?>'});

    </script>
<?php
    }else{
        if(options===null)
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

?>