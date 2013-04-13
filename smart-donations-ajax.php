<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/30/13
 * Time: 11:27 AM
 * To change this template use File | Settings | File Templates.
 */

function rednao_smart_donations_save()
{
    $donationName=$_REQUEST['name'];
    $returningURL=$_REQUEST['returningURL'];
    $donationOptions=$_REQUEST['donationOptions'];
    $email=$_REQUEST['email'];
    $donationType=$_REQUEST['donationType'];
    $message="";
    $donationId=0;

    if($donationType==null)
    {
        $message="Please pick a donation type first";
    }
    else if($donationName==null||$email==null)
    {

        $message= "Email and Name are mandatory";

    }else
    {
        global $wpdb;
        $donationId=$_REQUEST['donationId'];

        if($donationId==null)
        {
            $count= $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM wordpress.wp_smart_donations_donation_item where donation_name='$donationName'"));

            if($count>0)
            {
                $message="Donation Name already exists";

            }else
            {
                $sql="".SMART_DONATIONS_TABLE_NAME."";
                $values=array('donation_name'=>$donationName,
                              'returning_url'=>$returningURL,
                              'options'=>$donationOptions,
                              'email'=>$email,
                              'donation_type'=>$donationType
                            );
                $wpdb->insert(SMART_DONATIONS_TABLE_NAME,$values);
                $donationId=$wpdb->insert_id;
                $message="saved";
                delete_transient("rednao_smart_donations_donation_$donationId");
            }
        }else
        {
            $wpdb->update(SMART_DONATIONS_TABLE_NAME,array(
                'donation_name'=>$donationName,
                'returning_url'=>$returningURL,
                'options'=>$donationOptions,
                'email'=>$email,
                'donation_type'=>$donationType
            ),array("donation_id"=>$donationId));
            $message="saved";
            delete_transient("rednao_smart_donations_donation_$donationId");

        }

    }

    echo "{\"DonationId\":\"$donationId\",\"Message\":\"$message\"}";

    die();

}

?>