<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 5/18/13
 * Time: 6:57 PM
 * To change this template use File | Settings | File Templates.
 */

class smart_donations_db_privider {
    private $_TransactionIsRepeated=NULL;

    public function InsertTransaction($properties)
    {

        if($this->TransactionIsRepeated($properties[txn_id]))
            return false;
        $this->SanitizeProperties($properties);
        $this->InsertIntoDatabase($properties);
        return true;
    }

    private function TransactionIsRepeated($txn_id)
    {
        if($this->_TransactionIsRepeated===NULL)
        {
            global $wpdb;
            $this->_TransactionIsRepeated=($wpdb->get_var($wpdb->prepare("select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE." where txn_id=%s",$txn_id))>0);
        }
        return $this->_TransactionIsRepeated;
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

    public function RefundTransaction($txn_id)
    {
        global $wpdb;
        $wpdb->query($wpdb->prepare("delete from ".SMART_DONATIONS_TRANSACTION_TABLE." WHERE txn_id=%s",$txn_id));




    }


}