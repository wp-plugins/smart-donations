<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edseventeen
 * Date: 4/1/13
 * Time: 8:44 PM
 * To change this template use File | Settings | File Templates.
 */

    wp_enqueue_script("jquery");
?>

<p style="font-size:25px; font-weight: bold;">Do you want to see something added? Let me Know!!</p>



<table>
    <tr>
        <td>
            <form target="_blank" method="post" action="http://rednao.com/suggestion.php">
                <input type="hidden" name="application" value="Smart Donations"/>
                <textarea style="width:600px;height:300px; font-family: verdana;" name="suggestion"></textarea>
                <div style="text-align: right"><button style="cursor: hand;cursor: pointer; width:100px;height:25px;">Send Request</button></div>
            </form>
        </td>
        <td style="vertical-align: top">
            <div style="text-align: center; margin-left:15px;">
                <p style="font-size:18px; margin:0;padding: 0 0 5px 0;font-weight: bold; ">Author</p>
                <div>
                    <img  src="<?php echo plugin_dir_url(__FILE__)?>images/myPhoto.jpg" style="display: block"/>
                    <div style="text-align: right;">
                       <a href="https://twitter.com/edgarerojas" target="_blank"> <img  src="<?php echo plugin_dir_url(__FILE__)?>images/twitter.png"/></a>
                       <a href="https://plus.google.com/117324787123318950809" target="_blank"> <img  src="<?php echo plugin_dir_url(__FILE__)?>images/google.png"/></a>
                       <a href="https://www.facebook.com/RedNAOSoft" target="_blank"> <img  src="<?php echo plugin_dir_url(__FILE__)?>images/facebook.png"/> </a>
                    </div>

                    <p style="text-align: left; margin: 0;padding: 0; font-size: 14px;"> <strong>Name: </strong>Edgar Rojas</p>
                    <p style="text-align: left;padding: 0px;margin: 0; font-size: 14px;"> <strong>Site: </strong><a href="http://rednao.com" target="_blank">http://rednao.com</a></p>

                </div>
            </div>

        </td>
    </tr>
</table>

<div style="margin-top:10px; text-align: center;width:650px; border-style: dashed;border-color:black; border-width: 1px; background-color:#F9F9F9">
<p style="font-size: 14px; font-weight: bolder; font-family:verdana;color: green;">And if you like the component and you want to support it, please make a donation.</p>
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
