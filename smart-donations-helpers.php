<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/31/13
 * Time: 11:16 AM
 * To change this template use File | Settings | File Templates.
 */


function rednao_smart_donations_json_object($object)
{
    $json="{";
    $variables=explode("&",$object);
    foreach($variables as $val)
    {
        $variable=explode('=',$val);

        $json=$json."\"$variable[0]\":\"".(count($variable)>1?urldecode($variable[1]):"")."\",";
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
        $options=$wpdb->get_var($wpdb->prepare("select options from ".SMART_DONATIONS_TABLE_NAME." where donation_id='$id'"));
        if($options==null)
            return;
        $options=rednao_smart_donations_json_object($options);
        set_transient("rednao_smart_donations_donation_$id",$options,60*60*24*31);
    }
    wp_enqueue_script('jquery');
    wp_enqueue_script('isolated-slider',plugins_url('/smart-donations/js/rednao-isolated-jq.js'));
    wp_enqueue_script('smart-donations-donation-provider',plugins_url('/smart-donations/js/donationProvider.js'),array('isolated-slider'));
    wp_enqueue_script('smart-donations-generator',plugins_url('/smart-donations/js/donationGenerator.js'),array('isolated-slider','smart-donations-donation-provider'));
    wp_enqueue_script('smart-donations-generator-wepay',plugins_url('/smart-donations/js/donationGenerator_wepay.js'),array('smart-donations-generator'));
    wp_enqueue_script('smart-donations-raphael',plugins_url('/smart-donations/js/raphael-min.js'),array('isolated-slider'));
    wp_enqueue_style('smart-donations-main-style',plugins_url('/smart-donations/css/mainStyle.css'));
    wp_enqueue_style('smart-donations-Slider',plugins_url('/smart-donations/css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css'));
    $random=rand();

    if($returnComponent==false)
    {
    ?>
    <div id="donationContainer<?php echo $random?>"></div>

    <script>
        var smartDonationsRootPath="<?php echo plugins_url("/smart-donations/")?>";

        if(!window.smartDonationsItemsToLoad)
            window.smartDonationsItemsToLoad=new Array();;

        window.smartDonationsItemsToLoad.push({'options':<?php echo $options?>,'element':'donationContainer<?php echo $random?>'});

    </script>
<?php
    }else{
        return "<div id='donationContainer$random'></div>
            <script>
                var smartDonationsRootPath=\"".plugins_url('/smart-donations/')."\";
                if(!window.smartDonationsItemsToLoad)
                    window.smartDonationsItemsToLoad=new Array();;
                window.smartDonationsItemsToLoad.push({'options':$options,'element':'donationContainer$random'});
            </script>
           ";
    }
}

?>