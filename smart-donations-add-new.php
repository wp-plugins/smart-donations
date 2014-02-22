
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 3/29/13
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */

if(!defined('ABSPATH'))
    die('Forbidden');

require_once('smart-donations-license-helpers.php');

if(isset($_GET['mode'])&&$_GET['mode']=='pro')
{
    require_once(SMART_DONATIONS_DIR.'/smart-donations-forms-pro.php');
    return;
}

global $wpdb;

$campaigns=$wpdb->get_results("select campaign_id, name from ".SMART_DONATIONS_CAMPAIGN_TABLE);

wp_enqueue_script('jquery');
wp_enqueue_script('isolated-slider',plugin_dir_url(__FILE__).'js/rednao-isolated-jq.js');
wp_enqueue_script('smart-donations-jscolor',plugin_dir_url(__FILE__).'js/jscolor.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-configuration',plugin_dir_url(__FILE__).'js/donationConfiguration.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-configuration-wepay',plugin_dir_url(__FILE__).'js/donationConfiguration_wepay.js',array('isolated-slider','smart-donations-configuration'));
wp_enqueue_script('smart-donations-donation-provider',plugin_dir_url(__FILE__).'js/donationProvider.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-generator',plugin_dir_url(__FILE__).'js/donationGenerator.js',array('isolated-slider','smart-donations-donation-provider'));
wp_enqueue_script('smart-donations-generator-wepay',plugin_dir_url(__FILE__).'js/donationGenerator_wepay.js',array('smart-donations-generator'));
wp_enqueue_script('smart-donations-raphael',plugin_dir_url(__FILE__).'js/raphael-min.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-settings',plugin_dir_url(__FILE__).'js/smartDonationsSettings.js',array('isolated-slider','smart-donations-configuration','smart-donations-configuration-wepay','smart-donations-generator','smart-donations-donation-provider'));
wp_enqueue_script('smart-donations-style-manager',plugin_dir_url(__FILE__).'js/smartDonationsStyleManager.js',array('isolated-slider','smart-donations-configuration','smart-donations-configuration-wepay','smart-donations-generator','smart-donations-donation-provider'));
wp_enqueue_script('smart-donations-formelements',plugin_dir_url(__FILE__).'js/formBuilder/formelements.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-elementsProperties',plugin_dir_url(__FILE__).'js/formBuilder/elementsproperties.js',array('smart-donations-formelements'));
wp_enqueue_script('smart-donations-formBuilder',plugin_dir_url(__FILE__).'js/formBuilder/formbuilder.js',array('smart-donations-elementsProperties'));
wp_enqueue_script('rednao-message-manager',plugin_dir_url(__FILE__).'js/rednao-message-manager.js',array('isolated-slider'));
wp_enqueue_script('json2');


wp_enqueue_style('smart-donations-main-style',plugin_dir_url(__FILE__).'css/mainStyle.css');
wp_enqueue_style('smart-donations-Slider',plugin_dir_url(__FILE__).'css/smartDonationsSlider/jquery-ui-1.10.2.custom.min.css');
wp_enqueue_style('form-builder-boot-strap',plugin_dir_url(__FILE__).'css/formBuilder/bootstrap.min.css');
wp_enqueue_style('form-builder-custom',plugin_dir_url(__FILE__).'css/formBuilder/custom.css');



?>




    <script type="text/javascript">

		var smartFormsIsActive=<?php echo (is_plugin_active("smart-forms/smartforms.php")?"true":"false");?>;
        var payPalCurrencies=new Array("USD","AUD","BRL","GBP","CAD","CZK","DKK","EUR","HKD","HUF","ILS","JPY","MXN","TWD","NZD","NOK","PHP","PLN","SGD","SEK","CHF","THB");
        var wePayCurrencies=new Array("USD");
		var smartDonationsSandbox="<?php echo SMART_DONATIONS_SANDBOX ?>";

        var smartDonations_arrow_closed="<?php echo plugin_dir_url(__FILE__)?>images/arrow_right.png";
        var smartDonations_arrow_open="<?php echo plugin_dir_url(__FILE__)?>images/arrow_down.png";

        var smartDonationsRootPath="<?php echo plugin_dir_url(__FILE__)?>";

        function setCurrencyOptions(provider)
        {
            var providerCurrencies;
            if(provider=="wepay")
                providerCurrencies=wePayCurrencies;
            else
                providerCurrencies=payPalCurrencies;

            var comboCurrencies=rnJQuery("#smartDonationsCurrencyDropDown");
            comboCurrencies.empty();

            for(var i=0;i<providerCurrencies.length;i++)
                comboCurrencies.append('<option value="'+providerCurrencies[i]+'">'+providerCurrencies[i]+'</option>');

            comboCurrencies.val(providerCurrencies[0]);


        }



        function smartDonationsCurrencyChanged(element)
        {
            rnJQuery("#smartDonationsCurrency").val(rnJQuery("#smartDonationsCurrencyDropDown").val());
        }

        function smartDonationsCampaignChanged(element)
        {
            rnJQuery("#smartDonationsCampaign").val(rnJQuery("#select_campaign_id").val());
        }

        function donationDescriptionChanged(element)
        {
            rnJQuery('#smartDonationsDescription').val(rnJQuery('#smartDonationsDonationDescription').val());
        }




        function providerChanged() {
            SmartDonations_backFromConfiguration();
            var newProvider=rnJQuery(this).val()
            rnJQuery("#smartDonationsProvider").val(newProvider);
            setCurrencyOptions(newProvider);
            switch(newProvider)
            {
                case 'wepay':
                    rnJQuery('#smartDonationsImageClassic').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/classic_donation_wepay.png');
                    rnJQuery('#smartDonationsImageTextBox').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/text_box_donation_wepay.png');
                    rnJQuery('#smartDonationsImageSlider').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/slider_donation_wepay.png');
                    rnJQuery('#emailText').text("Donation Id");
                    rnJQuery('#imgEmailQuestion').show();
                    break;
                case 'paypal':
                    rnJQuery('#smartDonationsImageClassic').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/classic_donation.png');
                    rnJQuery('#smartDonationsImageTextBox').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/text_box_donation.png');
                    rnJQuery('#smartDonationsImageSlider').attr('src','<?php echo plugin_dir_url(__FILE__)?>images/slider_donation.png');
                    rnJQuery('#emailText').text("Email");
                    rnJQuery('#imgEmailQuestion').hide();


            }


        }
        function SmartDonationsInitialize()
        {
            rnJQuery( "#smartDonationRadio" ).buttonset();
            SmartDonationSettings();
            var previousFunction;
            smartDonationsEditDialog= rnJQuery("#smartDonationsEditWindow").dialog({
                width:720,
                height:480,
                modal:true,
                draggable:false,
                resizable:false,
                autoOpen:false,
                create: function(event, ui){
                    rnJQuery('.ui-dialog').wrap('<div class="smartDonationsSlider" />');
                },
                open: function(event, ui){
                    rnJQuery('.ui-widget-overlay').wrap('<div class="smartDonationsSlider" />');
                    previousFunction=null;
                    rnJQuery("#smartDonationsEditionArea").html('');
                    var generator=smartDonationsDonationType.generator;
                    generator.containerName="smartDonationsPreviewEditionContainer";
                    generator.GenerateDonationItem();

                    if(typeof WePay!='undefined')
                    {
                        previousFunction=WePay.show_dialog;
                        WePay.show_dialog=function(){};


                    }
                },
                close:function(event, ui){
                    smartDonationsDonationType.generator.containerName="smartDonationsPreviewContainer";
                    smartDonationsDonationType.generator.GenerateDonationItem();
                    if(previousFunction)
                    {
                        WePay.show_dialog=previousFunction;

                    }
                }
            });


            rnJQuery("#smartDonationsSaveButton").click(SmartDonationsSave);
            rnJQuery("#smartDonationsCurrencyDropDown").change(smartDonationsCurrencyChanged);
            rnJQuery("#select_campaign_id").change(smartDonationsCampaignChanged);
            rnJQuery("#smartDonationsEditImageButton").click(SmartDonationsStartStyling);
            rnJQuery('input[name=smartDonationEditStyle]').change(smartDonationEditTypeChanged);
            rnJQuery('#smartDonationsDonationDescription').change(donationDescriptionChanged);


            function smartDonationEditTypeChanged()
            {
                var typeOfEdition=rnJQuery('input[name=smartDonationEditStyle]:checked').val();

                if(typeOfEdition=='basic')
                {
                    rnJQuery('#smartDonationsEditionArea').show();
                    rnJQuery('#smartDonationsEditionCSSArea').hide();
                }

                if(typeOfEdition=='advanced')
                {
                    rnJQuery('#smartDonationsEditionArea').hide();
                    rnJQuery('#smartDonationsEditionCSSArea').show();
                }

            }
            if(typeof smartDonationsSavedEmail!='undefined')
            {
                rnJQuery('#smartDonationsEmail').val(smartDonationsSavedEmail);
            }

            if(typeof smartDonationsSavedName!='undefined')
            {
                rnJQuery('#smartDonationsName').val(smartDonationsSavedName);
            }

            if(typeof smartDonationsSavedReturningUrl!='undefined')
            {
                rnJQuery('#smartDonationsReturningUrl').val(smartDonationsSavedReturningUrl);
            }

            if(typeof smartDonationsSavedId!='undefined')
            {
                rnJQuery('#smartDonationsDonationId').val(smartDonationsSavedId);
            }

            if(typeof smartDonationsDonationProvider!='undefined')
            {
                rnJQuery("#rednao_smart_donations_provider").val(smartDonationsDonationProvider);
            }

            setCurrencyOptions(rnJQuery("#rednao_smart_donations_provider").val());




            if(typeof smartDonationsSavedOptions!='undefined')
            {
                SmartDonations_donationTypeClicked(null,smartDonationsSavedOptions);

                if(typeof smartDonationsSavedOptions.donation_currency != 'undefined')
                    rnJQuery("#smartDonationsCurrencyDropDown").val(smartDonationsSavedOptions.donation_currency).change();

                if(typeof smartDonationsSavedOptions.compaign_id!='undefined')
                    rnJQuery("#select_campaign_id").val(smartDonationsSavedOptions.campaign_id).change();

                if(typeof smartDonationsSavedOptions.donation_description!='undefined')
                    rnJQuery('#smartDonationsDonationDescription').val(smartDonationsSavedOptions.donation_description).change();

            }

            rnJQuery("#rednao_smart_donations_provider").change(providerChanged);

            rnJQuery("#imgEmailQuestion").click(function()
            {
                var dialog= rnJQuery("#emailQuestionDialog").dialog({
                    width:720,
                    height:480,
                    modal:true,
                    draggable:false,
                    resizable:false,
                    create: function(event, ui){
                        rnJQuery('.ui-dialog').wrap('<div class="smartDonationsSlider" />');

                    },
                    open: function(event, ui){
                        rnJQuery('.ui-widget-overlay').wrap('<div class="smartDonationsSlider" />');
                    }
                });


            });

        };





        function SmartDonationsSave(event)
        {
            event.preventDefault();
            var button=rnJQuery(this);
            button.focus();
            button.attr('disabled', 'disabled');
            button.text("Saving...");
            var businessElement=rnJQuery('#smart_donations_component_options input[name="business"]');
            if(businessElement.length<=0)
            {
                rnJQuery('#smart_donations_component_options').append('<input type="hidden" name="business" value="'+rnJQuery("#smartDonationsEmail").val()+'"/>');

            }else
                businessElement.val(rnJQuery("#smartDonationsEmail").val());


            var donationProviderElement=rnJQuery('#smart_donations_component_options input[name="donation_provider"]');
            donationProviderElement.val(rnJQuery("#rednao_smart_donations_provider").val());

            var donationsOptions=rnJQuery("#smart_donations_component_options, #smart_donations_component_options form").serialize();

            var stylesToSave="";

            var generator=GetCurrentGenerator();


            if(generator==null || typeof generator.styles=='undefined')
                stylesToSave=null;
            else
                stylesToSave=rnJQuery.param(smartDonationsDonationType.generator.styles);


            if(generator instanceof smartDonationsFormDonationGenerator)
            {
                stylesToSave=null;
                donationsOptions=new Object();
                var options=GetCurrentGenerator().GetOptions();
                options.smartDonationsType=rnJQuery('#smartDonationsType').val();
                options.donation_provider=rnJQuery('#smartDonationsProvider').val();
                options.campaign_id=rnJQuery('#smartDonationsCampaign').val();
                options.donation_currency=rnJQuery('#smartDonationsCurrency').val();
                options.business=rnJQuery("#smartDonationsEmail").val();
                options.returningUrl=rnJQuery("#smartDonationsReturningUrl").val();
                options.emailToNotify=rnJQuery('#smartDonationsNotifyToEmail').val();
                options.donation_description=rnJQuery('#smartDonationsDescription').val();
                donationsOptions=JSON.stringify(options);
            }

            var data={
                action:"rednao_smart_donations_save",
                name:rnJQuery("#smartDonationsName").val(),
                returningURL:rnJQuery("#smartDonationsReturningUrl").val(),
                email:rnJQuery("#smartDonationsEmail").val(),
                donationId:rnJQuery("#smartDonationsDonationId").val(),
                donationType:rnJQuery("#smartDonationsType").val(),
                donation_Provider:rnJQuery("#rednao_smart_donations_provider").val(),
                styles:stylesToSave,
                donationOptions:donationsOptions
            };

            rnJQuery.post(ajaxurl,data,ajaxCompleted);

        }

        function GetCurrentGenerator()
        {
            if(typeof(smartDonationsDonationType)== 'undefined' || smartDonationsDonationType==null|| typeof smartDonationsDonationType.generator =='undefined')
                return null;
            return smartDonationsDonationType.generator;
        }

        function ajaxCompleted(result,status)
        {

            var obj=rnJQuery.parseJSON(result);
            alert(obj.Message);
            if(obj.DonationId!="0")
                rnJQuery("#smartDonationsDonationId").val(obj.DonationId)

            var button=rnJQuery("#smartDonationsSaveButton");
            button.removeAttr("disabled");
            button.text("Save");
        }

        function SmartDonationsSerializeObject(array)
        {
            var o={};

            rnJQuery.each(array, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }


    </script>





<div style="width: 100%; display: block; margin: 5px 0 10px 0;padding: 0;height: 30px;">
<div class="updated fade below-h2 rednaoMessageManager" style="margin: 5px 0 10px 0; height: 0px; display: none; background-color: #EAFFFD; border-color: #B7E9E4; border-style: dotted;"></div>
</div>




<form id='smart_donations_general_options'>
    <div id="rednaoSmartDonaitions">

        <input type="hidden" name="donationId" id="smartDonationsDonationId" value=""/>

        <div  >
          <div class="treeDiv" id="smartDonationsBasic" style="display: inline-block">
            <img class="treeButton" src="<?php echo plugin_dir_url(__FILE__)?>images/arrow_down.png" alt=""/>
            <h2 class="treeTitle">Basic</h2>
          </div>
            <button style="margin-left: 530px;width:100px;cursor: hand;cursor: pointer;" id="smartDonationsSaveButton" >Save</button>
        </div>
        <div  id="smartDonationsBasicDetail">
            <hr/>
            <div class="category">
                <span>Donation Provider</span>
                <select name="smartDonationsProvider" id="rednao_smart_donations_provider" style="margin-bottom:5px;">
                    <option value="paypal" selected="sel">PayPal</option>
                    <option value="wepay">WePay</option>
                </select>
                <br/>
                <span>Campaign</span>
                <select name="campaign_id" id="select_campaign_id" style="margin-bottom:5px;">
                    <option value="0">Default</option>
                    <?php
                    foreach($campaigns  as $campaign)
                    {
                        echo "<option value='$campaign->campaign_id'>$campaign->name</option>";
                    }
                    ?>
                </select>

                <br/>

                <span>Name</span>
                <input type="text" name="smartDonationsName" id="smartDonationsName"/>
                <span class="description" style="margin-bottom:5px;"> *The name of the donation, this name is displayed in the donations list</span>
                <br/>
                <div>
                    <span id="emailText">Email</span>
                    <input type="text" name="business" id="smartDonationsEmail"/>
                    <img id="imgEmailQuestion" src="<?php echo plugin_dir_url(__FILE__)?>images/questionMark_small.jpg" style="vertical-align: middle; cursor: hand; cursor: pointer; display: none;">

                    <span class="description"> *Email Used for the donation</span>
                </div>
            </div>
        </div>


        <br/>



        <div class="treeDiv" id="smartDonationsAdvanced">
            <img class="treeButton" src="<?php echo plugin_dir_url(__FILE__)?>images/arrow_right.png" alt=""/>
            <h2 class="treeTitle">Advanced Options</h2>
        </div>
        <div  id="smartDonationsAdvancedDetail">
            <hr/>
            <div class="category" >
                <span>Currency</span>
                <select id="smartDonationsCurrencyDropDown" name="donation_currency"></select>
                <span class="description">*the selected currency for the donation</span>
                <br/>
                <span>Returning Url</span>
                <input type="text" id="smartDonationsReturningUrl"/>
                <span class="description">*Page displayed after he does a donation</span>
                <br/>
                <span>Donation Description</span>
                <input type="text" id="smartDonationsDonationDescription"/>
                <span class="description">*This text is going to be shown in the paypal invoice</span>
            </div>


        </div>
</form>


<form id='smart_donations_component_options' action="https://www.paypal.com/cgi-bin/webscr" method="post" class="donationForm" target="_blank">


        <!--Item Container--->
        <input type="hidden" id="smartDonationsType" name="smartDonationsType"/>
        <input type="hidden" id="smartDonationsProvider" name="donation_provider"/>
        <input type="hidden" id="smartDonationsCampaign" name="campaign_id" value="0"/>
        <input type="hidden" id="smartDonationsCurrency" name="donation_currency" value='USD'/>
        <input type="hidden" id="smartDonationsDescription" name="donation_description" value='Donation'/>


        <div id="smartdonationsItemsContainer">
            <div id="smartDonationsItemsContainerHeader">
                <span>Select a Donation Type</span>
            </div>
            <div id="smartDonationsItemsContainerBody">
                <div id="smartDonationsSlideAnimation">

                    <div id="smartDonationsItemsList">
                        <div class="smartDonationsItem">
                            <input type="hidden"  value="classic"/>
                            <img id="smartDonationsImageClassic" src="<?php echo plugin_dir_url(__FILE__)?>images/classic_donation.png" alt="" >
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="textbox"/>
                            <img id="smartDonationsImageTextBox" src="<?php echo plugin_dir_url(__FILE__)?>images/text_box_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="threeButtons"/>
                            <img  src="<?php echo plugin_dir_url(__FILE__)?>images/three_buttons_donation.png" alt="">
                        </div>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="slider"/>
                            <img  id="smartDonationsImageSlider" src="<?php echo plugin_dir_url(__FILE__)?>images/slider_donation.png" alt="">
                        </div>

                        <?php
                        if(smart_donations_check_license_with_options($error)||$error!=null)
                        {
                        ?>

                        <div class="smartDonationsItem">
                            <input type="hidden"  value="forms"/>
                            <img  id="smartDonationsImageSlider" src="<?php echo plugin_dir_url(__FILE__)?>images/form_donation.png" alt="">
                        </div>
                        <?php } else{?>


                        <div class="smartDonationsItem">
                            <input type="hidden"  />
                            <a href="?page=smart-donations/smartdonations.php&action=add&mode=pro">
                            <img  src="<?php echo plugin_dir_url(__FILE__)?>images/form_donation.png" alt=""></a>
                        </div>
                        <?php }?>

                    </div>




                    <div id="smartDonationsConfiguration">
                        <img id="smartDonationsBackFromConfiguration" src="<?php echo plugin_dir_url(__FILE__)?>images/arrow_back.png" alt="">
                        <span id="smartDonationsItemTitle">Test</span>


                        <div id="smartDonationsConfigurationFields" class="smartDonationsCustomFields">

                        </div>


                        <div id="smartDonationsPreview" >
                            <img id="smartDonationsEditImageButton" src="<?php echo plugin_dir_url(__FILE__)?>images/editButton.png" style="height: 25px; position: relative;display: inline;float:right;margin-top:5px; cursor: hand;cursor:pointer;">
                            <span id="smartDonationsPreviewText">Preview</span>

                            <div id="smartDonationsPreviewContainer">

                            </div>
                        </div>


                    </div>





                </div>


            </div>
        </div>

    </div>

</form>

<?php  ?>

    <div id="emailQuestionDialog" title="We Pay Id" style="display: none">
        <p>You can get the donation id on the code that you get when you create a donation button</p>
        <img src="<?php echo plugin_dir_url(__FILE__)?>images/wepay_demo.png">
    </div>

    <div id="smartDonationsEditWindow" title="Edit Time!! Click an element to edit it">

        <div id="smartDonationsEditionArea" class="smartDonationsCustomFields smartDonationsEditionArea">

        </div>

        <div id="smartDonationsEditionCSSArea" style="display:none" class="smartDonationsCustomFields smartDonationsEditionArea">
            <span>Here you can add CSS to customize the elemente like you want (example: width:10px;)</span>
            <textarea id="smartDonationsCSS" style="display: block; height: 250px;width: 680px;">

            </textarea>

            <button id="smartDonationsApplyStyle">Apply</button>
        </div>

        <div id="smartDonationRadio" class="smartDonationsSlider" style="text-align: right;width: 674px;">
            <input type="radio" id="radio1" value="basic"  name="smartDonationEditStyle"  checked="checked" /><label style="width:100px" for="radio1">Basic</label>
            <input type="radio" id="radio2"  value="advanced" name="smartDonationEditStyle" /><label label style="width:100px;margin-left:-5px;" for="radio2">Advanced</label>
        </div>


        <div id="smartDonationsPreviewEdition">
               <div id="smartDonationsPreviewEditionContainer" style="margin-top: 20px;"></div>

        </div>
    </div>

<div  id="rednaoPropertiesPanel" style="top: 74px; left: 711px; display: none;">
    <div class="arrow" ></div>
    <h3 class="rednaopopover-title">Form Name</h3>

    <div class="rednaopopover-content">
        <div class="rednaopropertiesform">
            <div id="rednaoPropertiesList" style="margin:0;padding:0;">
                <label class="control-label" id="rednaoFormTitle">Form Name</label>
                <input class="input-large field" data-type="input" type="text" name="name" id="name" value="Form Name">
            </div>
            <div>
                <hr>
                <button id="rednaoPropertySave" class="rednaoBtn rednaoBtnSave">Save</button>
                <button id="rednaoPropertyCancel" class="rednaoBtn rednaoBtnCancel">Cancel</button>
            </div>

        </div>
    </div>
</div>




