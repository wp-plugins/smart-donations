<?php

if(!defined('ABSPATH'))
    die('Forbidden');


if (isset($_GET['action'])) {
    $action=$_GET['action'];
}else
    $action='';

if($action==="add")
{
    require_once('smart-donations-progress-add.php');
    return;
}

wp_enqueue_script('jquery');
wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js',array('jquery'));
wp_enqueue_script('campaigns',plugin_dir_url(__FILE__).'js/smart-donations-progress-indicators.js',array('isolated-slider'));
wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');


if (isset($_GET['$progress_id'])) {
    $progress_id=$_GET['$progress_id'];
}else
    $progress_id='';


if($action!=null)
{
    global $wpdb;
    if($progress_id!=null)
    {
        if($action==="delete")
            $wpdb->query($wpdb->prepare("delete from ".SMART_DONATIONS_PROGRESS_TABLE." WHERE progress_id=%d",$progress_id));


        if($action==="edit")
        {
            $result=$wpdb->get_results($wpdb->prepare("SELECT * FROM ".SMART_DONATIONS_PROGRESS_TABLE." WHERE progress_id=%d",$progress_id));

            if(count($result)>0)
            {
                $result=$result[0];
                $options=rednao_smart_donations_json_object($result->options,$result->styles,null,null,null,null);

                $script=<<<EOF
                        <script type="text/javascript" language="javascript">
                            var smartDonationsSavedProgress_Id="%s";
                            var smartDonationsSavedCampaign_Id="%s";
                            var smartDonationsSavedName="%s";
                            var smartDonationsSavedProgressType="%s";
                            var smartDonationsSavedOptions=jQuery.parseJSON('%s');
                        </script>
EOF;
                echo sprintf($script,$result->progress_id,$result->campaign_id,$result->progress_name,$result->progress_type,$options);
                include(SMART_DONATIONS_DIR.'/smart-donations-progress-add.php');
                return;

            }
        }
    }



}

require_once('smart-donations-messages.php');
echo "<h1>Progress Indicators</h1>";
echo sprintf('<h2 ><a id="sDonationsAddNew" style="color:blue; text-decoration: underline;" href="?page=%s&action=%s">Add New</a></h2>',$_REQUEST['page'],'add');

class Donations extends WP_List_Table
{
    function get_columns()
    {
        return array(
            'progress_name'=>'Name',
            'campaign_name'=>'Campaign',
            'progress_type'=>'Type',
            'progress_id'=>'Progress Id'
        );
    }

    function prepare_items()
    {
        $this->_column_headers=array($this->get_columns(),array('progress_id'),$this->get_sortable_columns());
        global $wpdb;
        $this->items=$result=$wpdb->get_results("select progress_name,coalesce(campaign.name,'Default') campaign_name,progress_type,progress_id
                                                    from ".SMART_DONATIONS_PROGRESS_TABLE." progress
                                                    left join ".SMART_DONATIONS_CAMPAIGN_TABLE." campaign
                                                    on campaign.campaign_id=progress.campaign_id ");
    }

    function get_sortable_columns()
    {

    }

    function column_default($item, $column_name)
    {
        return $item->$column_name;
    }

    function column_progress_name($item) {
        $actions = array(
            'edit'      => sprintf('<a href="?page=%s&$progress_id=%s&action=%s">Edit</a>',$_REQUEST['page'],$item->progress_id,'edit'),
            'delete'    => sprintf('<a href="?page=%s&$progress_id=%s&action=%s">Delete</a>',$_REQUEST['page'],$item->progress_id,'delete'),
        );

        return sprintf('%1$s %2$s', $item->progress_name, $this->row_actions($actions) );
    }
}

$donationList=new Donations();
$donationList->prepare_items();
$donationList->display();

?>

