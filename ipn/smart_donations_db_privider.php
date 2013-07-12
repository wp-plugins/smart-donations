<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 5/18/13
 * Time: 6:57 PM
 * To change this template use File | Settings | File Templates.
 */

class smart_donations_db_privider {

    public function InsertTransaction($properties)
    {

        if($this->TransactionIsRepeated($properties[txn_id]))
            return;
        $this->SanitizeProperties($properties);
        $this->InsertIntoDatabase($properties);
    }

    private function TransactionIsRepeated($txn_id)
    {
        global $wpdb;
        return $wpdb->get_var($wpdb->prepare("select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE." where txn_id='$txn_id'"))>0;
    }

    private function InsertIntoDatabase($properties)
    {
        global $wpdb;
        $wpdb->insert(SMART_DONATIONS_TRANSACTION_TABLE,$properties);
    }

    private function SanitizeProperties(& $properties)
    {
        $properties['date'] = date('Y-m-d H:i:s', strtotime($properties['date']));

        if($properties['mc_fee']==null)
            $properties['mc_fee']=0;

        if($properties['mc_gross']==null)
            $properties['mc_gross']=0;

        if($properties['additional_fields']==null)
            $properties['additional_fields']='';

        if($properties['campaign_id']==null)
            $properties['campaign_id']=0;
    }

    public function RefundTransaction($properties)
    {
        global $wpdb;
        $wpdb->update(SMART_DONATIONS_TRANSACTION_TABLE,array(
            'status'=>'r'
        ),array("txn_id"=>$properties[txn_id]));


    }


}