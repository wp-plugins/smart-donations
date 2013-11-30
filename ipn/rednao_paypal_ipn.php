<?php
require_once('../../../../wp-config.php');
require_once('wordpress_connection_provide.php');
require_once('smart_donations_db_privider.php');

global $rednaolog;
class rednao_paypal_ipn
{

    /** @var  connection_provider_base */
    private $connectionProvider;
    /**
     * @var smart_donations_db_privider
     */
    private $dbProvider;


    function __construct(connection_provider_base $connectionProvider, smart_donations_db_privider $dbProvider)
    {
        $this->connectionProvider = $connectionProvider;
        $this->dbProvider = $dbProvider;
    }

    public function ProcessCall()
    {
        global $wpdb;
        RedNaoAddMessage("Latest error:". $wpdb->last_error);
        RedNaoAddMessage("Checking if it is valid");
        if ($this->connectionProvider->IsValid()) {
            RedNaoAddMessage("Requiest is valid");
            $properties = array();
            if (isset($_POST['txn_id'])) {
                $properties['txn_id'] = $_POST['txn_id'];
            } else
                $properties['txn_id'] = '';


            if (isset($_POST['payer_email'])) {
                $properties['payer_email'] = $_POST['payer_email'];
            } else
                $properties['payer_email'] = '';


            if (isset($_POST['first_name'])) {
                $properties['first_name'] = $_POST['first_name'];
            } else
                $properties['first_name'] = '';


            if (isset($_POST['last_name'])) {
                $properties['last_name'] = $_POST['last_name'];
            } else
                $properties['last_name'] = '';

            if (isset($_POST['mc_fee'])) {
                $properties['mc_fee'] = $_POST['mc_fee'];
            } else
                $properties['mc_fee'] = '';

            if (isset($_POST['mc_gross'])) {
                $properties['mc_gross'] = $_POST['mc_gross'];
            } else
                $properties['mc_gross'] = '';


            if (isset($_POST['payment_date'])) {
                $properties['date'] = $_POST['payment_date'];
            } else
                $properties['date'] = '';


            if (isset($_POST['additional_fields'])) {
                $properties['additional_fields'] = $_POST['additional_fields'];
            } else
                $properties['additional_fields'] = '';


            if (isset($_POST['custom'])) {
                $properties['campaign_id'] = $_POST['custom'];
            } else
                $properties['campaign_id'] = '';

            if (isset($_POST["receiver_email"])) {
                $receiverEmail = $_POST["receiver_email"];
            } else
                $receiverEmail = '';

            RedNaoAddMessage("Check if it is a donation or refund");
            if ($this->DonationWasReceived()) {
                RedNaoAddMessage("It is a donation");
                $txn_type = '';
                if (isset($_POST['txn_type']))
                    $txn_type = $_POST['txn_type'];
                RedNaoAddMessage("Checkhing if receiver email is valid");
                if ($this->ReceiverEmailIsValid($receiverEmail)) {
                    RedNaoAddMessage("Receiver is valid");
                    $properties['status'] = 'c';
                    $formId = "";
                    if (!is_numeric($properties['campaign_id'])) {
                        RedNaoAddMessage("Is a form");
                        $formString = rawurldecode($properties['campaign_id']);
                        parse_str($formString, $formStringParameters);
                        if (sizeof($formStringParameters) == 2) {
                            $properties['campaign_id'] = $formStringParameters['campaign_id'];
                            $formId = $formStringParameters['formId'];
                        } else {
                            $this-> SendFormError($properties['payer_email'], 'the parameters sent by paypal are corrupt', $properties);
                            return;
                        }
                    }


                    if($txn_type == "subscr_signup")
                        $this->ProcessThankYouEmailIfAny($properties);
                    else
                    {

                        $form="";
                        if($formId!=null)
                            $form = get_transient($formId);

                            $properties['form_information']=$form?$form:"";

                        RedNaoAddMessage("Inserting transaction");
                        if ($this->dbProvider->InsertTransaction($properties)) {
                            RedNaoAddMessage("Transaction was inserted sucessfully");
                            if($txn_type!='subscr_payment')
                                $this->ProcessThankYouEmailIfAny($properties);
                        }
                        RedNaoAddMessage("Latest error:". $wpdb->last_error);
                    }

                    if ($formId != null&&$txn_type!='subscr_payment') {
                        $this->ProcessForm($properties, $formId);
                    }
                }
            }




            if ($this->DonationWasRefunded()) {
                RedNaoAddMessage("Is a refund");
                if (isset($_POST['parent_txn_id'])) {
                    RedNaoAddMessage("Refunding transaction in the database");
                    $this->dbProvider->RefundTransaction($_POST['parent_txn_id']);
                }

            }

            if ($properties['campaign_id'] !== null) {
                $campaign_id = $properties['campaign_id'];
                global $wpdb;
                $result = $wpdb->get_results($wpdb->prepare("select progress_id from " . SMART_DONATIONS_PROGRESS_TABLE . " where campaign_id=%d", $campaign_id));
                foreach ($result as $key => $value) {
                    delete_transient("rednao_smart_donations_progress_$value->progress_id");
                }
                delete_transient("rednao_smart_donations_wall_".$campaign_id);
            }

        }else{
            RedNaoAddMessage("Transaction is not valid");
        }
    }

    private function ProcessThankYouEmailIfAny($properties)
    {
        RedNaoAddMessage("Processing thank you email");
        $campaign_id = $properties['campaign_id'];
        if ($campaign_id > 0) {
            global $wpdb;
            $results = $wpdb->get_results($wpdb->prepare("SELECT email_subject,email_from,thank_you_email FROM " . SMART_DONATIONS_CAMPAIGN_TABLE . " where campaign_id=%d", $campaign_id));

            if (count($results) > 0) {
                $result = $results[0];
                if ($result->email_subject != null) {
                    try {
                        $headers = 'MIME-Version: 1.0' . "\r\n";
                        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
                        if($result->email_from!='')
                            $headers.= 'From: '.$result->email_from.' <'.$result->email_from. '>'. "\r\n";
                        wp_mail($_POST['payer_email'], $result->email_subject, $result->thank_you_email, $headers);
                    } catch (Exception $e) {
                        $this->SendFormError($e->getMessage(), $properties);
                    }
                }
            }
        }

    }


    private function DonationWasReceived()
    {
        $txn_type = '';
        if (isset($_POST['txn_type']))
            $txn_type = $_POST['txn_type'];

        if($txn_type == "subscr_signup")
            return true;


        if (isset($_POST['payment_status'])) {
            return $_POST['payment_status'] === "Pending" || $_POST['payment_status'] == "Completed" || $txn_type == "subscr_payment";
        }
        return false;


    }

    private function DonationWasRefunded()
    {
        if (isset($_POST['payment_status'])) {
            $status = strtolower($_POST['payment_status']);
            return $status === "refunded" || $status == "denied" || $status == "expired" || $status == "failed" || $status == "reversed" || $status == "voided";
        }
        return false;
    }

    private function ReceiverEmailIsValid($receiverEmail)
    {
        RedNaoAddMessage($receiverEmail);
        global $wpdb;
        $count = $wpdb->get_var($wpdb->prepare("select count(*) from " . SMART_DONATIONS_TABLE_NAME . " where email=%s", $receiverEmail));

        return $count > 0;
    }

    private function ProcessForm($properties, $formId)
    {
        RedNaoAddMessage("Processing form");
        $form = get_transient($formId);
        if ($form == false) {
            this . SendFormError('The submitted form was not found, that means this transaction was processed 3 days after the payment', $properties);
            return;
        }


        $splittedFormOptions = explode('rednaosplitter', $form);
        $formElementsValues = explode('&', $splittedFormOptions[1]);

        try {
            $this->SendFormEmail($formElementsValues, $properties, $splittedFormOptions[0]);

        } catch (Exception $e) {
            $this->SendFormError($e->getMessage(), $properties);
        }


    }

    private function SendFormError($error, $properties)
    {
        global $rednaolog;
        RedNaoAddMessage($error->getMessage());
    }

    private function SendFormEmail($formElementsValues, $properties, $notifyToEmails)
    {
        $email = '<table border="1" cellspacing="1">';

        $email .= "<tr><td style='padding:10px'><b>" . Donor . "</b></td><td style='padding:10px'>" . $properties['payer_email'] . "</td></tr>";

        foreach ($formElementsValues as $value) {
            $splitValue = explode('=', $value);

            $label = rawurldecode($splitValue[0]);
            $email .= "<tr><td style='padding:10px'><b>" . htmlentities($label) . "</b></td>";
            if (sizeof($splitValue) == 2) {
                $value = explode(',', $splitValue[1]);


                if (sizeof($value) >= 2) {
                    $email .= "<td><table>";
                    for ($i = 0; $i < sizeof($value); $i++) {
                        $email .= "<tr><td style='padding:10px'>" . htmlentities(rawurldecode($value[$i])) . "</td></tr>";
                    }
                    $email .= "</table></td>";
                } else
                    $email .= "<td style='padding:10px'>" . htmlentities(rawurldecode($value[0])) . "</td>";
            }

            $email .= "</tr>";
        }

        $email .= "</table>";
        try {
            global $wpdb;
            $emailFrom = $wpdb->get_var($wpdb->prepare("SELECT email_from FROM " . SMART_DONATIONS_CAMPAIGN_TABLE . " where campaign_id=%d", $properties['campaign_id']));


            $headers = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            if($emailFrom!='')
                $headers.= 'From: '.$emailFrom.' <'.$emailFrom. '>'. "\r\n";

            if ($notifyToEmails != null) {
                $notifyEmail = str_replace(';', ',', $notifyToEmails);
            } else
                $notifyEmail = $_POST['receiver_email'];
            wp_mail($notifyEmail, 'Donation Received', $email, $headers);
        } catch (Exception $e) {
            $this->SendFormError($e->getMessage(), $properties);
        }
    }

}

$ipn = new rednao_paypal_ipn(new wordpress_connection_provide(), new smart_donations_db_privider());

try{
    $ipn->ProcessCall();
}catch(Exception $e)
{
    $rednaolog.=$e->getMessage();
}


function RedNaoAddMessage($message)
{
    global $rednaolog;
    $rednaolog.=$message."<br/>";
}


$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";



