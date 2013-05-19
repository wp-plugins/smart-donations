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

<div style="text-align: center;width:650px;">
    <?php
    require_once('smart-donations-support-links.php');
    ?>
</div>
