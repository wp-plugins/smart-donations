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