<?php
if(!defined('ABSPATH'))
    die('Forbidden');

require_once("smart-donations-helpers.php");


$action=$_GET['action'];
$donation_id=$_GET['id'];


if($action!=null&&$donation_id!=null)
{
    global $wpdb;
    if($action=="delete")
    {
        $wpdb->query($wpdb->prepare("delete from ".SMART_DONATIONS_TABLE_NAME." WHERE donation_id=$donation_id"));
        delete_transient("rednao_smart_donations_donation_$donation_id");
    }

    if($action=="edit")
    {
        $result=$wpdb->get_results($wpdb->prepare("SELECT * FROM ".SMART_DONATIONS_TABLE_NAME." WHERE donation_id=$donation_id"));

        if(count($result)>0)
        {
            $result=$result[0];
            $options=rednao_smart_donations_json_object($result->options,$result->styles);

            $script=<<<EOF
                        <script type="text/javascript" language="javascript">
                            var smartDonationsSavedId="%s";
                            var smartDonationsSavedEmail="%s";
                            var smartDonationsSavedName="%s";
                            var smartDonationsSavedReturningUrl="%s";
                            var smartDonationsSavedOptions=jQuery.parseJSON('%s');
                            var smartDonationsDonationProvider="%s";
                        </script>
EOF;
            echo sprintf($script,$result->donation_id,$result->email,$result->donation_name,$result->returning_url,$options,$result->donation_provider);
            include(SMART_DONATIONS_DIR.'/smart-donations-add-new.php');
            return;

        }


    }
}


if(!class_exists('WP_LIST_TABLE'))
{
    require_once(ABSPATH.'wp-admin/includes/class-wp-list-table.php');
}


class Donations extends WP_List_Table
{
    function get_columns()
    {
        return array(
          donation_name=>'Donation Name',
          email=>'Email',
          donation_type=>'Type',
          donation_id=>'Donation Id'
        );
    }

    function prepare_items()
    {
        $this->_column_headers=array($this->get_columns(),array(),$this->get_sortable_columns());
        global $wpdb;
        $this->items=$result=$wpdb->get_results("SELECT donation_id,donation_name,email,donation_type FROM ".SMART_DONATIONS_TABLE_NAME);
    }

    function get_sortable_columns()
    {

    }

    function column_default($item, $column_name)
    {
        return $item->$column_name;
    }

    function column_donation_name($item) {
        $actions = array(
            'edit'      => sprintf('<a href="?page=%s&id=%s&action=%s">Edit</a>',$_REQUEST['page'],$item->donation_id,'edit'),
            'delete'    => sprintf('<a href="?page=%s&id=%s&action=%s">Delete</a>',$_REQUEST['page'],$item->donation_id,'delete'),
        );

        return sprintf('%1$s %2$s', $item->donation_name, $this->row_actions($actions) );
    }
}

$donationList=new Donations();
$donationList->prepare_items();
$donationList->display();

?>

<div style="margin-top:10px; text-align: center;width:650px; border-style: dashed;border-color:black; border-width: 1px; background-color:#F9F9F9">
    <p style="font-size: 14px; font-weight: bolder; font-family:verdana;color: green;">If you like the component and you want to support it, please make a donation.</p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
        <input type="hidden" name="cmd" value="_donations">
        <input type="hidden" name="business" value="edseventeen@gmail.com">
        <input type="hidden" name="lc" value="US">
        <input type="hidden" name="item_name" value="Edgar Rojas">
        <input type="hidden" name="no_note" value="0">
        <input type="hidden" name="currency_code" value="USD">
        <input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>
</div>
