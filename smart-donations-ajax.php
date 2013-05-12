<?php


function rednao_smart_donations_save()
{
    $donationName=$_REQUEST['name'];
    $returningURL=$_REQUEST['returningURL'];
    $donationOptions=$_REQUEST['donationOptions'];
    $email=$_REQUEST['email'];
    $donationType=$_REQUEST['donationType'];
    $donation_provider=$_REQUEST['donation_Provider'];
    $styles=$_REQUEST['styles'];
    $message="";
    $donationId=0;

    if($donation_provider==null)
    {
        $message="Please pick a donation provider first";
    }else
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
                              'donation_type'=>$donationType,
                              'donation_provider'=>$donation_provider,
                              'styles'=>$styles
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
                'donation_type'=>$donationType,
                'donation_provider'=>$donation_provider,
                'styles'=>$styles
            ),array("donation_id"=>$donationId));
            $message="saved";
            delete_transient("rednao_smart_donations_donation_$donationId");

        }

    }

    echo "{\"DonationId\":\"$donationId\",\"Message\":\"$message\"}";

    die();

}


function rednao_smart_donations_list()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }

    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare("SELECT donation_id,donation_name FROM ".SMART_DONATIONS_TABLE_NAME));

    echo "[{\"DonationId\":\"0\",\"Name\":\"Select a donation\"}";
    foreach($result as $key=>$row)
    {
        echo ",{\"DonationId\":\"$row->donation_id\",\"Name\":\"$row->donation_name\"}";
    }
    echo"]";
    die();

}

?>