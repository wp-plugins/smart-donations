<?php
require_once('../../../../wp-config.php');
require_once('wordpress_connection_provide.php');
require_once('smart_donations_db_privider.php');
class rednao_paypal_ipn {

    /** @var  connection_provider_base */
    private $connectionProvider;
    /**
     * @var smart_donations_db_privider
     */
    private $dbProvider;


    function __construct(connection_provider_base $connectionProvider,smart_donations_db_privider $dbProvider){
        $this->connectionProvider=$connectionProvider;
        $this->dbProvider = $dbProvider;
    }

    public function ProcessCall()
    {
        if($this->connectionProvider->IsValid())
        {
            $properties=array();
            $properties['txn_id']=$_POST['txn_id'];
            $properties['payer_email']=$_POST['payer_email'];
            $properties['first_name']=$_POST['first_name'];
            $properties['last_name']=$_POST['last_name'];
            $properties['mc_fee']=$_POST['mc_fee'];
            $properties['mc_gross']=$_POST['mc_gross'];
            $properties['date']=$_POST['payment_date'];
            $properties['additional_fields']=$_POST['additional_fields'];
            $properties['campaign_id']=$_POST['custom'];

            if($this->DonationWasReceived())
            {
                $properties['status']='c';
                $this->dbProvider->InsertTransaction($properties);
            }
            if($this->DonationWasRefunded())
            {
                $this->dbProvider->RefundTransaction($properties);
            }
        }
    }


    private function DonationWasReceived()
    {
        return $_POST['payment_status']==="Pending";



    }

    private function DonationWasRefunded()
    {
        return $_POST['payment_status']==="Refunded";
    }
}
$ipn=new rednao_paypal_ipn(new wordpress_connection_provide(), new smart_donations_db_privider());
$ipn->ProcessCall();

?>