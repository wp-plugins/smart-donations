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
            $count= $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM ".SMART_DONATIONS_TABLE_NAME." where donation_name='$donationName'"));

            if($count>0)
            {
                $message="Donation Name already exists";

            }else
            {
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

    echo "[{\"Id\":\"0\",\"Name\":\"Select a donation\"}";
    foreach($result as $key=>$row)
    {
        echo ",{\"Id\":\"$row->donation_id\",\"Name\":\"$row->donation_name\"}";
    }
    echo"]";
    die();

}


function rednao_smart_progress_donations_list()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }

    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare("SELECT progress_id,progress_name  FROM ".SMART_DONATIONS_PROGRESS_TABLE));

    echo "[{\"Id\":\"0\",\"Name\":\"Select a progress indicator\"}";
    foreach($result as $key=>$row)
    {
        echo ",{\"Id\":\"$row->progress_id\",\"Name\":\"$row->progress_name\"}";
    }
    echo"]";
    die();

}


function rednao_smart_donations_add_campaign()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }

    global $wpdb;

    $name=$_POST["name"];
    $description=$_POST["description"];
    $goal=$_POST["goal"];

    if($name==null)
    {
        echo "Campaign name is mandatory";
        die();
    }

    if(!is_numeric($goal))
        $goal=0;



    $count= $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM ".SMART_DONATIONS_CAMPAIGN_TABLE." where name='$name'"));

    if($count>0)
    {
        echo "A campaign with the same name exist";
        die();
    }

    $wpdb->insert(SMART_DONATIONS_CAMPAIGN_TABLE,array(
        'name'=>$name,
        'description'=>$description,
        'goal'=>$goal,
    ));

    echo "success";
    die();


}



function rednao_smart_donations_edit_campaign()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }

    global $wpdb;

    $name=$_POST["name"];
    $description=$_POST["description"];
    $goal=$_POST["goal"];
    $campaign_id=$_POST["campaign_id"];

    if($name==null)
    {
        echo "Campaign name is mandatory";
        die();
    }

    if(!is_numeric($goal))
        $goal=0;



    $count= $wpdb->update(SMART_DONATIONS_CAMPAIGN_TABLE,array(
                "name"=>$name,
                "description"=>$description,
                "goal"=>$goal),array("campaign_id"=>$campaign_id));


    $result=$wpdb->get_results($wpdb->prepare("select progress_id from ".SMART_DONATIONS_PROGRESS_TABLE." where campaign_id=$campaign_id"));

    foreach($result as $key=>$value)
    {
        delete_transient("rednao_smart_donations_progress_$value->progress_id");
    }


    echo "success";
    die();


}


function rednao_smart_donations_save_progress_bar()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }
    $progress_name=$_POST['progress_name'];
    $campaign_id=$_POST['campaign_id'];
    $progress_id=$_POST['progress_id'];
    $progress_type=$_POST['progress_type'];
    $styles=$_POST['styles'];
    $options=$_POST['options'];
    $message="";
    if($progress_name==null)
        $message= "Name is mandatory";
    else
    if($progress_type==null)
        $message= "Progress Type is mandatory";
    else
    {

        global $wpdb;
        if($progress_id==null)
        {
            $count= $wpdb->get_var($wpdb->prepare("SELECT count(*) FROM ".SMART_DONATIONS_PROGRESS_TABLE." where progress_id='progress_id'"));

            if($count>0)
            {
                $message="Progress Name already exists";

            }else
            {
                $values=array('progress_name'=>$progress_name,
                    'options'=>$options,
                    'campaign_id'=>$campaign_id,
                    'progress_type'=>$progress_type,
                    'styles'=>$styles
                );
                $wpdb->insert(SMART_DONATIONS_PROGRESS_TABLE,$values);
                $progress_id=$wpdb->insert_id;
                $message="saved";
                delete_transient("rednao_smart_donations_progress_$progress_id");
            }
        }else
        {
            $wpdb->update(SMART_DONATIONS_PROGRESS_TABLE,array(
                'progress_name'=>$progress_name,
                'options'=>$options,
                'campaign_id'=>$campaign_id,
                'progress_type'=>$progress_type,
                'styles'=>$styles,
            ),array("progress_id"=>$progress_id));
            $message="saved";
            delete_transient("rednao_smart_donations_progress_$progress_id");

        }
    }



    echo "{\"progress_id\":\"$progress_id\",\"Message\":\"$message\"}";

    die();

}

function rednao_smart_donations_execute_analytics()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }
    $startDate=$_POST['startDate'];
    $endDateReceived=$_POST['endDate'];
    $displayType=$_POST['displayType'];
    $campaign_id=$_POST['campaign_id'];

    $startDate=date('Y-m-d H:i:s', strtotime($startDate));
    $endDate=date('Y-m-d H:i:s', strtotime($endDateReceived." 23:59:59"));
    $endDateWithoutTime=date('Y-m-d H:i:s', strtotime($endDateReceived));

    if($startDate==null)
    {
        echo 'Start Date is mandatory';
        die();
    }
    if($endDate==null)
    {
        echo 'End Date is mandatory';
        die();
    }

    if($startDate>=$endDate)
    {
        echo 'End Date must be bigger than start date';
        die();
    }


    if($displayType==null)
    {
        echo 'Display Type is mandatory';
        die();
    }
    if($campaign_id==null)
    {
        echo 'Campaign is mandatory';
        die();
    }

    if(!StartDateIsValid($startDate,$displayType))
    {
        echo 'Start Date is invalid';
        die();
    }

    if(!EndDateIsValid($endDate,$displayType))
    {
        echo 'End Date is invalid';
        die();
    }


    $sumFormat='';

    if($displayType=='d')
    {
        $query="select concat(year(date),'-',month(date),'-' ,day(date)) date, sum(mc_gross) gross from ".SMART_DONATIONS_TRANSACTION_TABLE."
                where date between '$startDate' and '$endDate' and (campaign_id=$campaign_id or $campaign_id=-1)
                group by year(date),month(date),day(date)
                order by year(date),month(date),day(date)";
    }

    if($displayType=='w')
    {
        $query="select  concat(year(date),'-',month(date),'-' ,day(date)) date,gross from(
        select  adddate(date,interval 1-dayofweek(date) day) date, gross from
        (
            select date,sum(mc_gross) gross from ".SMART_DONATIONS_TRANSACTION_TABLE."
            where date between '$startDate' and '$endDate' and (campaign_id=$campaign_id or $campaign_id=-1)
            group by year(date),week(date)
            order by year(date),week(date)
        ) tb1)tb2";
    }

    if($displayType=='m')
    {
        $query="select concat(year(date),'-',month(date),'-' ,1) date, sum(mc_gross) gross from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_id or $campaign_id=-1)
        group by year(date),month(date)
        order by year(date),month(date)";
    }

    if($displayType=='y')
    {
        $query="select concat(year(date),'-',1,'-' ,1) date, sum(mc_gross) gross from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_id or $campaign_id=-1)
        group by year(date)
        order by year(date)";
    }


    global $wpdb;
    $result=$wpdb->get_results($wpdb->prepare($query));

    $values=array();
    foreach($result as $row)
    {
        array_push($values,array($row->date,$row->gross));

    }

    $nextValue=$startDate;
    $index=0;
    $returnArray=array();
    $increment="";
    switch($displayType)
    {
        case 'd':
            $increment="+1 day";
            break;
        case 'w':
            $increment="+1 week";
            break;
        case 'm':
            $increment="+1 month";
            break;
        case 'y':
            $increment="+1 year";
            break;
    }

    $endStrTime=strtotime($endDateWithoutTime);
    $nextValueStrTime=strtotime($startDate);
    $nextValueDate=date('Y-n-j',$nextValueStrTime);
    while($nextValueStrTime<=$endStrTime)
    {

        if($values[$index][0]==$nextValueDate)
        {
            array_push($returnArray,$values[$index]);
            $index+=1;
        }
        else
           array_push($returnArray,array($nextValueDate,0));


        $nextValueStrTime=strtotime($nextValueDate.' '.$increment);
        $nextValueDate=date('Y-n-j',$nextValueStrTime);


    }


    echo "[";
    for($i=0;$i<count($returnArray);$i++)
    {
        if($i!=0)
            echo ",";
        echo '["'.$returnArray[$i][0].'",'.$returnArray[$i][1].']';
    }

    echo "]";











    die();
}


function StartDateIsValid($startDate,$displayType)
{
    switch($displayType)
    {
        case 'd':
            return true;
            break;
        case 'w':
            return date('w',strtotime($startDate))==0;
            break;
        case 'm':
            return date('j',strtotime($startDate))==1;
            break;
        case 'y':
            return date('j',strtotime($startDate))==1&&date('n',strtotime($startDate))==1;
            break;
        default:
            return false;
    }

}

function EndDateIsValid($endDate,$displayType)
{
    switch($displayType)
    {
        case 'd':
            return true;
            break;
        case 'w':
            return date('w',strtotime($endDate))==6;
            break;
        case 'm':
            $numberOfDaysInMonth=date('t',strtotime(($endDate)));
            return date('j',strtotime($endDate))==$numberOfDaysInMonth;
            break;
        case 'y':
            return date('j',strtotime($endDate))==31&&date('n',strtotime($endDate))==12;
            break;
        default:
            return false;
    }
}

function GetPostOrDie($name){
    $aux=$_POST[$name];
    if($aux==null)
        die();

    return $aux;
}

function GetGetOrDie($name){
    $aux=$_GET[$name];

    if($aux==null)
        die();

    return $aux;
}

function rednao_smart_donations_execute_analytics_list()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }
    $rows=(int)GetPostOrDie('rows');
    $rpage=(int)GetPostOrDie('page');
    $sortColumn=GetPostOrDie('sidx');
    $order=GetPostOrDie('sord');
    $startDate=GetGetOrDie('date');
    $campaign_Id=GetGetOrDie('campaign_Id');
    $displayType=GetGetOrDie('displayType');

    $startDate=date('Y-m-d H:i:s', strtotime($startDate));

    $step=($rpage-1)*$rows;

    if(!StartDateIsValid($startDate,$displayType))
    {
        die();
    }


    $increment="";
    switch($displayType)
    {
        case 'd':
            $increment="+1 day";
            break;
        case 'w':
            $increment="+1 week";
            break;
        case 'm':
            $increment="+1 month";
            break;
        case 'y':
            $increment="+1 year";
            break;
    }

    $endDate=strtotime($startDate.' '.$increment);
    $endDate=Date('Y-m-d H:i:s',$endDate);


    switch($sortColumn)
    {
        case "Date":
            $sortColumn="date";
           break;
        case "FirstName":
            $sortColumn="first_name";
            break;
        case "LastName":
            $sortColumn="last_name";
            break;
        case "Email":
            $sortColumn="payer_email";
            break;
        case "Gross":
            $sortColumn="mc_gross";
            break;
        case "Fee":
            $sortColumn="mc_fee";
            break;

        default:
            $sortColumn="date";
    }

    if($displayType=='d')
    {
        $query="select coalesce(campaign_id,0) campaign_id,transaction_id, date, mc_gross gross,first_name,last_name,payer_email,mc_fee from ".SMART_DONATIONS_TRANSACTION_TABLE."
                where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)
                order by $sortColumn $order limit $step,$rows";

        $queryCount="select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE."
                where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)";
    }

    if($displayType=='w')
    {
        $query="select  campaign_id,transaction_id,date, gross,first_name,last_name,payer_email,mc_fee from(
        select  campaign_id,transaction_id,date, gross,first_name,last_name,payer_email,mc_fee from
        (
            select coalesce(campaign_id,0) campaign_id,transaction_id,date,mc_gross gross,first_name,last_name,payer_email,mc_fee from ".SMART_DONATIONS_TRANSACTION_TABLE."
            where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)
            order by $sortColumn $order limit $step,$rows
        ) tb1)tb2";

        $queryCount=" select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE."
            where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)";
    }

    if($displayType=='m')
    {
        $query="select coalesce(campaign_id,0) campaign_id,transaction_id, date, mc_gross gross,first_name,last_name,payer_email,mc_fee from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)
        order by $sortColumn $order limit $step,$rows";

        $queryCount="select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)";
    }

    if($displayType=='y')
    {
        $query="select coalesce(campaign_id,0) campaign_id,transaction_id, date, mc_gross gross,first_name,last_name,payer_email,mc_fee from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)
        order by $sortColumn $order limit $step,$rows";

        $queryCount="select count(*) from ".SMART_DONATIONS_TRANSACTION_TABLE."
        where date between '$startDate' and '$endDate' and (campaign_id=$campaign_Id or $campaign_Id=-1)";
    }


    global $wpdb;
    $count= $wpdb->get_var($wpdb->prepare($queryCount));
    $result=$wpdb->get_results($wpdb->prepare($query));

    $firstRecord=ture;
    echo '{"total":"'.ceil($count/$rows).'","records":"'.$count.'","rows": [';
    foreach($result as $row)
    {
        if(!$firstRecord)
            echo ",";
        else
            $firstRecord=false;

        echo '{"TransactionId":'.json_encode($row->transaction_id).',"Date":"'.$row->date.'","Gross":"'.$row->gross.'","FirstName":'.json_encode($row->first_name).',"LastName":'.json_encode($row->last_name).',"Email":'.json_encode($row->payer_email).',"Fee":"'.$row->mc_fee.'","campaign_id":"'.$row->campaign_id.'"}';




    }

    echo "]}";
    die();

}


function rednao_smart_donations_execute_analytics_op()
{
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
    }


    $oper=$_POST["oper"];
    $transactionId=$_POST["TransactionId"];

    if($oper==="del")
    {
        global $wpdb;
        $wpdb->query($wpdb->prepare("delete from ".SMART_DONATIONS_TRANSACTION_TABLE." WHERE transaction_id=$transactionId"));
        return;

    }
    $firstName=$_POST["FirstName"];
    $lastName=$_POST["LastName"];
    $date=$_POST["Date"];
    $email=$_POST["Email"];
    $gross=$_POST["Gross"];
    $fee=$_POST["Fee"];
    $campaign_id=$_POST["campaign_id"];



    if($firstName==null)
    {
        status_header(501);
        echo "First name is mandatory";
        die();
    }

    if($lastName==null)
    {
        status_header(501);
        echo "Last name is mandatory";
        die();
    }

    if($email==null)
    {
        status_header(501);
        echo "Email is mandatory";
        die();
    }

    if(!is_numeric($gross) or $gross<=0)
    {
        status_header(501);
        echo "Gross should me bigger than 0";
        die();
    }


    if(!strtotime($date))
    {
        echo "Invalid Date, the format should be YYYY-MM-DD";
        status_header(501);
        die();
    }


    if(!is_null($fee))
        $fee=0;

    if($campaign_id==null)
        $campaign_id=0;

    $date=date('Y-m-d H:i:s', strtotime($date));
    if($oper==="edit")
    {
        global $wpdb;





        $wpdb->update(SMART_DONATIONS_TRANSACTION_TABLE,array(
            'date'=>$date,
            'payer_email'=>$email,
            'first_name'=>$firstName,
            'last_name'=>$lastName,
            'mc_fee'=>$fee,
            'mc_gross'=>$gross
        ),array("transaction_id"=>$transactionId));
    }

    if($oper=="add")
    {
        global $wpdb;

        $wpdb->insert(SMART_DONATIONS_TRANSACTION_TABLE,array(
            'date'=>$date,
            'payer_email'=>$email,
            'first_name'=>$firstName,
            'last_name'=>$lastName,
            'mc_fee'=>$fee,
            'mc_gross'=>$gross,
            'campaign_id'=>$campaign_id
        ));
    }

    die();

}
?>