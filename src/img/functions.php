<?php


function erake_for_bd()
{
    global $wpdb;
    $parametr = array("Command" => "AccountsList", "Fields" => "Player");
    $api = Poker_API($parametr);

    $players = $api->Player;
    $result = $wpdb->get_col("
    SELECT user 
    FROM  wp_rake");


    foreach ($players as $player) {

        $today = date("Y-m-d");
        $params = array("Command" => "AccountsGet", "Player" => $player);
        $api = Poker_API($params);


        $wpdb->replace(
            'wp_rake',
            array('user' => $player, 'rake' => $api->ERake, 'date' => $today),
            array('%s', '%f', '%s')
        );
    }
    return "ok";
}

add_action('erake_bd', 'erake_for_bd');


/* Custom functions code goes here. */

/*function custom_header_content()
{
    ?>
    <script>
        jQuery(function ($) {
            $("[name='viewport']").attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        });
    </script>
    <?php
}

add_action('wp_head', 'custom_header_content');
add_action('admin_head', 'custom_header_content');*/

/*Register*/

function registrationform_shortcode()
{
    $html = "";
    $avatarurl = "https://texas83.com/modal/style/ava150.png";   // set your url here
    $avatarmax = 64;       // number of avatars available
    $avatarsize = 150;      // use 32 in version 5, 48 in version 4
    $avatarHeight = 150;


    if (array_key_exists('errors', $_GET) && $_GET['errors'] == 'false') {
        $html .= "<alert style='text-align: center;color: green; class='success'>Player created!</alert>";

        return $html;
    }
    if (array_key_exists('errors', $_GET) && $_GET['errors'] != 'false' && !$_GET['created']) {
        $html .= "<alert style='text-align: center;color: red;' class='danger'>" . $_GET['errors'] . " Try again</alert>";
    }
    if (array_key_exists('errors', $_GET) && $_GET['errors'] != 'false' && $_GET['created'] && $_GET['created'] == 'true') {
        $html .= "<alert style='text-align: center;color: green;' class='danger'>Player created! Note: " . $_GET['errors'] . "</alert>";
        return $html;
    }
    $html .= "
		<form method='post'>

		<div class='input-container'>
    <i class='fa fa-user icon'></i>
    <input class='input-field' type='text' placeholder='Your player name' name='Player'>
  </div>";

    $html .= "
		<div class='input-container'>
    <i class='fa fa-key icon'></i>
    <input class='input-field' type='password' name='Password1' required placeholder='Password'>
  </div>


		<div class='input-container'>
    <i class='fa fa-key icon'></i>
    <input class='input-field' type='password' name='Password2' required placeholder='Confirm password'>
  </div>

	<input type='hidden' name='Location' Value='Internet' >
	<h4 style='color:#fff'>Avatar </h4> <div style='width: 171px; height: 150px; overflow: auto; border: solid 2px'>";
    for ($i = 0; $i < $avatarmax; $i++) {
        $a = "display: inline-block; width: " . $avatarsize . "px; height: " . $avatarHeight . "px; background: " .
            "url('" . $avatarurl . "') no-repeat -" . ($i * $avatarsize) . "px 0px;";
        $html .= "<input type='radio' id='radio-" . ($i + 1) . "' name='Avatar' value='" . ($i + 1) . "'";
        if ($i == 0) $html .= ' checked';
        $html .= ">";
        $html .= "<label for='radio-" . ($i + 1) . "'><div style=\"" . $a . "\"></div></label>";
        $html .= "<br><br>\r\n";
    }
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    $g = substr(str_shuffle($permitted_chars), 0, 10);
    $html .= "
			</div>
			<input  type='hidden' name='RealName' value='player' >
    <input  type='hidden' name='Email' value='" . $g . "@poker.com' >
	<input type='hidden'  name='Gender' Value='Male' >
			<p style='text-align:center; margin-top:20px;'></p>

			<div class='input-container' style='margin-top:25px'>

    <i class='fa fa-portrait icon'></i>
    <input type='file' name='img' accept='image/jpeg,image/png,image/gif'>
  </div>
<div style='text-align:center; margin-top:25px;' ><input type='submit' class='btn' name='Submitrpm' value='Create Account' /></div>
			</form>";
    return $html;
}


add_shortcode('registrationform', 'registrationform_shortcode');

/*  Register wordpress  */

add_shortcode('regword', function () {
    if (isset($_REQUEST["Submitrpm"])) {
        $new_user_id = wp_insert_user(
            array(
                'user_login' => $_REQUEST["Player"],
                'user_email' => $_REQUEST["Email"],
                'user_pass' => $_REQUEST["Password1"],
                'first_name' => $_REQUEST["RealName"],
                'nickname' => $_REQUEST["Player"],
                'description' => $_REQUEST["Location"]
            )
        );
    }
});


/*Запрет незарегестрированным пользователям на лобби*/

function prefix_redirect_function()
{
    if (is_page(11) && !is_user_logged_in()) {
        wp_redirect(home_url());
        exit;
    }
}

add_action('template_redirect', 'prefix_redirect_function', 9);


function prefix_redirect_function2()
{
    if (is_page(262) && !is_user_logged_in()) {
        wp_redirect(home_url());
        exit;
    }
}

add_action('template_redirect', 'prefix_redirect_function2', 9);

/*  Register Poker Mavens  */


add_shortcode('regpokermavens', function () {


    if (isset($_REQUEST["Submitrpm"])) {


        $user = get_user_by('login', $_REQUEST["Player"]);

        $Player = $_REQUEST["Player"];
        $RealName = $_REQUEST["RealName"];
        $Gender = $_REQUEST["Gender"];
        $Location = $_REQUEST["Location"];
        $Password1 = $user->user_pass;
        $Password2 = $user->user_pass;
        // $Password1 = $_REQUEST["Password1"];
        //$Password2 = $_REQUEST["Password2"];
        $Email = $_REQUEST["Email"];
        $Avatar = $_REQUEST["Avatar"];
        if ($Password1 <> $Password2) die("Password mismatch. Click Back Button to correct.");
        $params = array(
            "Command" => "AccountsAdd",
            "Player" => $Player,
            "RealName" => $RealName,
            "PW" => $Password1,
            "Location" => $Location,
            "Email" => $Email,
            "Avatar" => $Avatar,
            "Gender" => $Gender,
            "Chat" => "Yes",
            "Note" => "Account created via API"
        );
        $api = Poker_API($params);
        if ($api->Result == "Ok") {

            echo ' <h3 style="text-align:center; color:#fff; margin-top:25px;">You have successfully registered, press the login button to go to the game</h3>
<form id="inputs" name="loginform" method="POST" action="/wp-login.php">
    <input class="input-field" type="hidden" placeholder="Username" name="log" id="log" value="' . $_REQUEST["Player"] . '">
    <input class="input-field" type="hidden" placeholder="Password" name="pwd" id="pwd" value="' . $_REQUEST["Password1"] . '">

<input type="submit" name="Submit" class="btn" value="LOGIN"  />


</form>


<div><img src="https://texas83.com/wp-content/uploads/2020/11/badbead.png" width="354"/></div>
<div style="text-align:center; color:#fff; margin-top:25px; font-size:27px;">After 3 seconds, you will automatically enter the game</div>
<script> setTimeout(function(){document.querySelector("#inputs > input.btn").click()}, 1000);  </script>';
        } else echo "Error: " . $api->Error . "<br>Click Back Button to correct!!!!!";
        exit;
    }
});


/* Login  */

add_shortcode(
    'erake3',
    function () {
        $server = "https://narine.pp.ua";


        if (isset($_POST["Login"])) {
            $player = $_POST["log"];
            $password = $_POST["pwd"];
            $params = array("Command" => "AccountsPassword", "Player" => $player, "PW" => $password);
            $api = Poker_API($params);
            if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
            if ($api->Verified != "Yes") die("Password is incorrect. Click Back Button to retry.");
            $params = array("Command" => "AccountsSessionKey", "Player" => $player);
            $api = Poker_API($params);
            if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
            $key = $api->SessionKey;
            $src = $server . "/?LoginName=" . $player . "&SessionKey=" . $key;
            echo "<script>window.location.assign('$src')</script>\r\n</body>\r\n</html>";
            exit;
        }
    }
);


/* Переадресация после входа */
function login_redirect()
{

    return '/lobby';
}

add_filter('login_redirect', 'login_redirect');


/*  Смена пароля  */
function function_my_password()
{
    if (isset($_REQUEST["Submitpass"])) {
        $Password1 = $_REQUEST["Password1"];
        $current_user = wp_get_current_user();
        $player = $current_user->user_login;
        $null = wp_set_password($Password1, $current_user->ID);
        if ($null == null) {
            echo "<script>window.location.reload()</script>";
        }
    }
}

add_shortcode('password', 'function_my_password');


add_shortcode('password_html', function () {
    return ' <form method="post" style="text-align:center">
     <label><div class="input-container"><i class="fa fa-key icon"></i><input type="password" name="Password1" required placeholder="Enter a new password" /></div></label>
    <label><input style="margin-top:15px;" type="submit" name="Submitpass" value="Change password" /></label>
  </form>';
});

/*ФОРМА ВХОДА*/

add_shortcode('shortcode_form', function () {

    $out = '<div id="login_tp">
<form id="inputs" name="loginform" action="https://texasroom.club/wp-login.php" method="POST">
  <h2 style="text-align:center;color:#fff">Login form</h2>
  <div class="input-container">
    <i class="fa fa-user icon"></i>
    <input class="input-field" type="text" placeholder="Username" name="log" id="log">
  </div>

  <div class="input-container">
    <i class="fa fa-key icon"></i>
    <input class="input-field" type="password" placeholder="Password" name="pwd" id="pwd">
  </div>

<input type="submit" name="Submit" class="btn" value="LOGIN" />

</form>
</div>';
    return $out;
});


/*Авторизирован или нет*/
add_action('init', 'action_auth');
function action_auth()
{
    if (is_user_logged_in()) {


        if (get_pagenum_link(get_query_var('paged')) == "https://texasroom.club/") {

            wp_redirect('/lobby', 301);
            die;
        }
    }
}

/*  LOGOUT    */

add_action('wp_logout', function () {
    $current_user = wp_get_current_user();
    $logi = $current_user->user_login;
    $parametr = array("Command" => "AccountsList", "Fields" => "Player");
    $api = Poker_API($parametr);
    $players = $api->Player;
    foreach ($players as $player) {
        if ($player == $logi) {
            $params = array("Command" => "AccountsGet", "Player" => $player);
            $api = Poker_API($params);
            $s = $api->SessionID;
            $p = array("Command" => "ConnectionsTerminate", "SessionID" => $s);
            Poker_API($p);
            //clean_user_cache($current_user->ID);
        }
    }
});

add_shortcode('logout', function () {
    echo wp_loginout();
});


/*ПЕРЕАДРЕСАЦИЯ ПОСЛЕ ВЫХОДА */

add_action('wp_logout', 'my_wp_logout');
function my_wp_logout()
{
    wp_safe_redirect('/');
    exit;
}

;


/* MY BALANCE */

function function_my_balance()
{

    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        if (isset($current_user->user_login)) {
            $logi = $current_user->user_login;
            $parametr = array("Command" => "AccountsList", "Fields" => "Player");
            $api = Poker_API($parametr);
            $players = $api->Player;
            foreach ($players as $player) {
                if ($player == $logi) {
                    $params = array("Command" => "AccountsGet", "Player" => $player);
                    $api = Poker_API($params);
                    $ball = "<span style='color:#29BEB9'> <i class='fas fa-gem'></i> <span>" . $api->Balance . " </span> </span>";
                    //$ball = "<span style='color:#29BEB9'>  <span>" . $api->Balance . " </span> <i class='fas fa-euro-sign'></i></span>" ;
                }
            }
        }
    }
    return $ball;
}

add_shortcode('mybalance', 'function_my_balance');

/*USER*/

function iframe_user()
{
    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        $player = $current_user->user_login;
        return "<i class='fas fa-user'></i> " . $player;
    }
}

add_shortcode('user', 'iframe_user');

/*ПЕРЕВОД БАЛАНСА*/

function count_erake()
{


    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        $pla = $current_user->user_login;
        $parametr = array("Command" => "AccountsList", "Fields" => "Player");
        $api = Poker_API($parametr);
        $parametr_bal = array("Command" => "AccountsGet", "Player" => $pla);
        $ba = Poker_API($parametr_bal);
        $html = "<form method='post' style='text-align:center'><label style='color:#fff'>Select a player</label><div class='input-container'><i class='fa fa-user icon'></i><select name='play'>";
        $players = $api->Player;
        $i = 0;
        foreach ($players as $player) {
            if ($player) {
                $params = array("Command" => "AccountsGet", "Player" => $player);
                $api = Poker_API($params);
                $html .= "<option>" . $player . "</option>";
            }
        }
        $b = $ba->Balance;
        return $html . "</select></div> <label></label><div class='input-container'><i class='fa fa-money icon'></i><input  type='number' style='' placeholder='Transfer amount' name='number' id='quantity' min='0' max='" . $b . "' ></div> <input style='margin-top:15px;' type='submit' name='Submitbalance' value='Transfer money' onclick='fas()' /></form> ";
    }
    return 'This function is available to the administrator';
}

add_shortcode('erake', 'count_erake');

/*ПЕРЕВОД БАЛАНСА ЛОГИКА*/

// add_shortcode('addbalance', function () {
//     if (isset($_POST["Submitbalance"])) {
//         $num = $_POST["number"];
//         $play = $_POST["play"];
//         $current_user = wp_get_current_user();
//         $player = $current_user->user_login;
//         $params3 = array("Command" => "AccountsGet", "Player" => $player);
//         $api3 = Poker_API($params3);
//         $ga = $api3->Balance;
//         if ($ga < 0) {
//             $num = 0;
//             $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
//             $api = Poker_API($params1);
//             if ($api->Result === "Ok") ;
//             $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
//             $api = Poker_API($params2);
//         }
//         if ($ga >= 0) {
//             $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
//             $api = Poker_API($params1);
//             if ($api->Result === "Ok") ;
//             $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
//             $api = Poker_API($params2);
//             if ($api->Result === "Ok") ;
//             echo '<script>
//   location.href= "/uspeh";
// </script>';

//         }
//     }
// });


add_shortcode('addbalance', function () {
    if (isset($_POST["Submitbalance"])) {
        global $wpdb;
        date_default_timezone_set('Europe/Athens');
        $today = date("Y-m-d H:i:s");


        $num = $_POST["number"];
        $play = $_POST["play"];
        $current_user = wp_get_current_user();
        $player = $current_user->user_login;
        $params3 = array("Command" => "AccountsGet", "Player" => $player);
        $api3 = Poker_API($params3);
        $ga = $api3->Balance;
        if ($ga < 0) {
            $num = 0;
            $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
            $api = Poker_API($params1);
            if ($api->Result === "Ok") ;
            $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
            $api = Poker_API($params2);


            $wpdb->replace(
                'wp_transiction',
                array('user1' => $player, 'user2' => $play, 'amount' => $num, 'date' => $today),
                array('%s', '%s', '%f', '%s')
            );
        }
        if ($ga >= 0) {
            $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
            $api = Poker_API($params1);
            if ($api->Result === "Ok") ;
            $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
            $api = Poker_API($params2);
            if ($api->Result === "Ok") ;


            $wpdb->replace(
                'wp_transiction',
                array('user1' => $player, 'user2' => $play, 'amount' => $num, 'date' => $today),
                array('%s', '%s', '%f', '%s')
            );
            echo '<script>
  location.href= "/uspeh";
</script>';
        }
    }
});


/*  RAKE */

add_shortcode('myrake', function () {
    if (is_user_logged_in()) {

        $current_user = wp_get_current_user();
        $logi = $current_user->user_login;
        $parametr = array("Command" => "AccountsList", "Fields" => "Player");
        $api = Poker_API($parametr);
        $players = $api->Player;
        foreach ($players as $player) {
            if ($player == $logi) {
                $params = array("Command" => "AccountsGet", "Player" => $player);
                $api = Poker_API($params);
                $rake = "<span style=''>Rake: </span> <span style='color:#fff;'>" . $api->ERake . "</span>";
            }
        }
        return $rake;
    }
});

add_shortcode('myrakesbros', function () {
    if (is_user_logged_in()) {
        if (isset($_POST['rake'])) {
            $rake = $_POST['rake'];
            $current_user = wp_get_current_user();
            $logi = $current_user->user_login;
            $params = array("Command" => "AccountsEdit", "Player" => $logi, "ERake" => $rake);
            $api = Poker_API($params);
        }
        return "<form  method='post'><input type='hidden' name='rake' value='0'/> <button class='buttonka'>Reset Rake</button></form>";
    }
});


/* Оставляет пользователя на той же странице при вводе неверного логина/пароля в форме авторизации wp_login_form()*/

add_filter('login_redirect', 'my_login_redirect', 10, 3);

/**
 * Redirect user after successful login.
 *
 * @param string $redirect_to URL to redirect to.
 * @param string $request URL the user is coming from.
 * @param object $user Logged user's data.
 * @return string
 */
function my_login_redirect($redirect_to, $request, $user)
{

    //is there a user to check?
    if (isset($user->roles) && is_array($user->roles)) {

        // check for admins
        if (in_array('administrator', $user->roles)) {
            // redirect them to the default place
            return $redirect_to;
        } else {
            return home_url();
        }
    } else {
        return $redirect_to;
    }
}


add_filter('authenticate', 'login_fail');
function login_fail()
{
    $referrer = $_SERVER['HTTP_REFERER'];  // откуда пришел запрос

    // Если есть referrer и это не страница wp-login.php
    if (!empty($referrer) && !strstr($referrer, 'wp-login') && !strstr($referrer, 'wp-admin')) {

        return wp_redirect(add_query_arg('login', 'failed', $referrer));  // редиркетим и добавим параметр запроса ?login=failed


    }
}


/*      Disable admin panel*/
add_filter('show_admin_bar', '__return_false'); // отключить


function wpschool_set_cookies2()
{

    // дата и время визита пользователя
    $visit_time = date('F j, Y g:i a');
    // проверка, если cookie уже заданы
    if (isset($_COOKIE['wpschool_visit_time'])) {

        // действия, если cookie уже заданы
        function wpschool_visitor_greeting()
        {
            // использование данных cookies
            $lastvisit = $_COOKIE['wpschool_visit_time'];
            $string .= 'Вы последний раз посещали наш сайт ' . $lastvisit . '. Узнайте, что нового';
            return $string;
        }
    } else {

        // действия, если cookie не найдены
        function wpschool_visitor_greeting()
        {
            $string .= 'Вы тут впервые? Проверьте эти ресурсы...';
            return $string;
        }

        // установка cookie
        setcookie('wpschool_visit_time', $visit_time, time() + 31556926);
    }

    // создание шорткода
    add_shortcode('wpschool_greet_me', 'wpschool_visitor_greeting');
}

add_action('init', 'wpschool_set_cookies2');


/*--------------------------------------------------------------------*/


add_shortcode('df', function () {


    $current_user = wp_get_current_user();
    $user = get_user_by('id', $current_user->ID);
    $server = "https://narine.pp.ua";


    $player = $user->user_login;
    $password = $user->user_pass;

    $params = array("Command" => "AccountsPassword", "Player" => $player, "PW" => $password);
    $api = Poker_API($params);
    sleep(3);

    if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
    //if ($api -> Verified != "Yes") die("Password is incorrect. Click Back Button to retry.");
    $paramsem = array("Command" => "AccountsSessionKey", "Player" => $player);
    $apik = Poker_API($paramsem);
    if ($apik->Result != "Ok") die($apik->Error . "<br/>" . "Click Back Button to retry.");
    $key = $apik->SessionKey;


    $src = $server . "/?LoginName=" . $player . "&amp;SessionKey=" . $key;
    return "<iframe id='iframe'  allowfullscreen='allowfullscreen' src='$src' width='100%' class='poker' frameborder='0'></iframe> ";
});


/*-----------------------------------------------------------*/

add_shortcode('afilia', function () {

    if (current_user_can('subscriber')) {

        return "<div style='margin:0 auto;' ><iframe id='iframe'  allowfullscreen='allowfullscreen' src='https://aphilia.texas83.com/agents/#/access/login?username=demo0000&password=1234' width='100%'  frameborder='0'></iframe> </div>\r\n</body>\r\n </html>";
    }

    return "<div style='margin:0 auto;' ><iframe id='iframe'  allowfullscreen='allowfullscreen' src='https://aphilia.texas83.com/admin/#/access/login' width='100%'  frameborder='0'></iframe> </div>\r\n</body>\r\n </html>";
});


/*----------------------------------------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||------------------------------------------------*/


add_action('rest_api_init', function () {
    register_rest_route('pokerapi/v1', '/getgames/', array(
        'methods' => 'GET',
        'callback' => 'my_awesome_func',
        'permission_callback' => '__return_true'
    ));


    register_rest_route('pokerapi/v1', '/getrakealldate/', array(
        'methods' => 'GET',
        'callback' => 'get_rake_all_date',
        'permission_callback' => '__return_true'
    ));


    register_rest_route('pokerapi/v1', '/deletgames/', array(
        'methods' => 'POST',
        'callback' => 'del_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/passwordreplace/', array(
        'methods' => 'POST',
        'callback' => 'password_replace',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            ),
            'password' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/getonegames/', array(
        'methods' => 'POST',
        'callback' => 'get_ringgames_for_edit',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/addmessages/', array(
        'methods' => 'POST',
        'callback' => 'message_for_table_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            ),
            'message' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/offlinegames/', array(
        'methods' => 'POST',
        'callback' => 'offline_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));

    register_rest_route('pokerapi/v1', '/onlinegames/', array(
        'methods' => 'POST',
        'callback' => 'online_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));

    register_rest_route('pokerapi/v1', '/addtable/', array(
        'methods' => 'POST',
        'callback' => 'addtable_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            "name" => array('type' => 'string', 'required' => true,),
            "description" => array('type' => 'string', 'required' => true,),
            "auto" => array('type' => 'string', 'required' => true,),
            "game" => array('type' => 'string', 'required' => true,),
            "mixedlist" => array('type' => 'string', 'required' => true,),
            "mixedhands" => array('type' => 'int', 'required' => true,),
            "pw" => array('type' => 'string', 'required' => true,),
            "private" => array('type' => 'string', 'required' => true,),
            "permplay" => array('type' => 'string', 'required' => true,),
            "permobserve" => array('type' => 'string', 'required' => true,),
            "permplayerchat" => array('type' => 'string', 'required' => true,),
            "permobserverchat" => array('type' => 'string', 'required' => true,),
            "suspendchatallin" => array('type' => 'string', 'required' => true,),
            "seats" => array('type' => 'int', 'required' => true,),
            "primarycurrency" => array('type' => 'string', 'required' => true,),
            "smallestchip" => array('type' => 'float', 'required' => true,),
            "buyinmin" => array('type' => 'int', 'required' => true,),
            "buyinmax" => array('type' => 'int', 'required' => true,),
            "buyindef" => array('type' => 'int', 'required' => true,),
            "caplimit" => array('type' => 'int', 'required' => true,),
            "rakepercent" => array('type' => 'int', 'required' => true,),
            "rakecap" => array('type' => 'int', 'required' => true,),
            "turnclock" => array('type' => 'int', 'required' => true,),
            "turnwarning" => array('type' => 'int', 'required' => true,),
            "timebank" => array('type' => 'int', 'required' => true,),
            "banksync" => array('type' => 'string', 'required' => true,),
            "bankreset" => array('type' => 'int', 'required' => true,),
            "disprotect" => array('type' => 'string', 'required' => true,),
            "smallblind" => array('type' => 'int', 'required' => true,),
            "bigblind" => array('type' => 'int', 'required' => true,),
            "allowstraddle" => array('type' => 'string', 'required' => true,),
            "smallbet" => array('type' => 'int', 'required' => true,),
            "bigbet" => array('type' => 'int', 'required' => true,),
            "ante" => array('type' => 'int', 'required' => true,),
            "anteall" => array('type' => 'string', 'required' => true,),
            "bringin" => array('type' => 'int', 'required' => true,),
            "dupeips" => array('type' => 'string', 'required' => true,),
            "ratholeminutes" => array('type' => 'int', 'required' => true,),
            "sitoutminutes" => array('type' => 'int', 'required' => true,),
            "sitoutrelaxed" => array('type' => 'string', 'required' => true,),
            "tablegraphic" => array('type' => 'string', 'required' => true,),
            "note" => array('type' => 'string', 'required' => true,)

        )
    ));


    register_rest_route('pokerapi/v1', '/edittable/', array(
        'methods' => 'POST',
        'callback' => 'edittable_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            "name" => array('type' => 'string', 'required' => true,),
            "description" => array('type' => 'string', 'required' => true,),
            "auto" => array('type' => 'string', 'required' => true,),
            "game" => array('type' => 'string', 'required' => true,),
            "mixedlist" => array('type' => 'string', 'required' => true,),
            "mixedhands" => array('type' => 'int', 'required' => true,),
            "pw" => array('type' => 'string', 'required' => true,),
            "private" => array('type' => 'string', 'required' => true,),
            "permplay" => array('type' => 'string', 'required' => true,),
            "permobserve" => array('type' => 'string', 'required' => true,),
            "permplayerchat" => array('type' => 'string', 'required' => true,),
            "permobserverchat" => array('type' => 'string', 'required' => true,),
            "suspendchatallin" => array('type' => 'string', 'required' => true,),
            "seats" => array('type' => 'int', 'required' => true,),
            "primarycurrency" => array('type' => 'string', 'required' => true,),
            "smallestchip" => array('type' => 'float', 'required' => true,),
            "buyinmin" => array('type' => 'int', 'required' => true,),
            "buyinmax" => array('type' => 'int', 'required' => true,),
            "buyindef" => array('type' => 'int', 'required' => true,),
            "caplimit" => array('type' => 'int', 'required' => true,),
            "rakepercent" => array('type' => 'int', 'required' => true,),
            "rakecap" => array('type' => 'int', 'required' => true,),
            "turnclock" => array('type' => 'int', 'required' => true,),
            "turnwarning" => array('type' => 'int', 'required' => true,),
            "timebank" => array('type' => 'int', 'required' => true,),
            "banksync" => array('type' => 'string', 'required' => true,),
            "bankreset" => array('type' => 'int', 'required' => true,),
            "disprotect" => array('type' => 'string', 'required' => true,),
            "smallblind" => array('type' => 'int', 'required' => true,),
            "bigblind" => array('type' => 'int', 'required' => true,),
            "allowstraddle" => array('type' => 'string', 'required' => true,),
            "smallbet" => array('type' => 'int', 'required' => true,),
            "bigbet" => array('type' => 'int', 'required' => true,),
            "ante" => array('type' => 'int', 'required' => true,),
            "anteall" => array('type' => 'string', 'required' => true,),
            "bringin" => array('type' => 'int', 'required' => true,),
            "dupeips" => array('type' => 'string', 'required' => true,),
            "ratholeminutes" => array('type' => 'int', 'required' => true,),
            "sitoutminutes" => array('type' => 'int', 'required' => true,),
            "sitoutrelaxed" => array('type' => 'string', 'required' => true,),
            "tablegraphic" => array('type' => 'string', 'required' => true,),
            "note" => array('type' => 'string', 'required' => true,),
            "newname" => array('type' => 'string', 'required' => true,)

        )
    ));

    /*---------TOURNAMENTS-----------*/

    register_rest_route('pokerapi/v1', '/getonetour/', array(
        'methods' => 'POST',
        'callback' => 'get_tournment_one_games_for_edit',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/gettournaments/', array(
        'methods' => 'GET',
        'callback' => 'get_tournaments_api',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('pokerapi/v1', '/delettournamentsgames/', array(
        'methods' => 'POST',
        'callback' => 'del_tournaments_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));

    register_rest_route('pokerapi/v1', '/offlinetournaments/', array(
        'methods' => 'POST',
        'callback' => 'offline_tournaments_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));

    register_rest_route('pokerapi/v1', '/onlinetournaments/', array(
        'methods' => 'POST',
        'callback' => 'online_tournaments_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));

    register_rest_route('pokerapi/v1', '/addmessagesturnaments/', array(
        'methods' => 'POST',
        'callback' => 'message_for_table_tournaments_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'type' => 'string',
                'required' => true,
            ),
            'message' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/addtableturnaments/', array(
        'methods' => 'POST',
        'callback' => 'addturnaments_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'gameid' => array('type' => 'string', 'required' => true,),
            'description' => array('type' => 'string', 'required' => true,),
            'autostart' => array('type' => 'string', 'required' => true,),
            'gametype' => array('type' => 'string', 'required' => true,),
            'mixedlist' => array('type' => 'string', 'required' => true,),
            'shootout' => array('type' => 'string', 'required' => true,),
            'password' => array('type' => 'string', 'required' => true,),
            'private' => array('type' => 'string', 'required' => true,),
            'permregister' => array('type' => 'string', 'required' => true,),
            'permunregister' => array('type' => 'string', 'required' => true,),
            'permobserve' => array('type' => 'string', 'required' => true,),
            'permplayerchat' => array('type' => 'string', 'required' => true,),
            'permobserverchat' => array('type' => 'string', 'required' => true,),
            'suspendchatallin' => array('type' => 'string', 'required' => true,),
            'tables' => array('type' => 'string', 'required' => true,),
            'seats' => array('type' => 'string', 'required' => true,),
            'startfull' => array('type' => 'string', 'required' => true,),
            'startmin' => array('type' => 'string', 'required' => true,),
            'startcode' => array('type' => 'string', 'required' => true,),
            'starttime' => array('type' => 'string', 'required' => true,),
            'regminutes' => array('type' => 'string', 'required' => true,),
            'lateregminutes' => array('type' => 'string', 'required' => true,),
            'latepenalty' => array('type' => 'string', 'required' => true,),
            'minplayers' => array('type' => 'string', 'required' => true,),
            'recurminutes' => array('type' => 'string', 'required' => true,),
            'resetseconds' => array('type' => 'string', 'required' => true,),
            'maxruns' => array('type' => 'string', 'required' => true,),
            'noshowminutes' => array('type' => 'string', 'required' => true,),
            'primarycurrency' => array('type' => 'string', 'required' => true,),
            'buyin' => array('type' => 'string', 'required' => true,),
            'bounty' => array('type' => 'string', 'required' => true,),
            'entryfee' => array('type' => 'string', 'required' => true,),
            'ticket' => array('type' => 'string', 'required' => true,),
            'ticketrequired' => array('type' => 'string', 'required' => true,),
            'ticketfunded' => array('type' => 'string', 'required' => true,),
            'prizebonus' => array('type' => 'string', 'required' => true,),
            'multiplybonus' => array('type' => 'string', 'required' => true,),
            'startingchips' => array('type' => 'string', 'required' => true,),
            'bonusticket' => array('type' => 'string', 'required' => true,),
            'addonchips' => array('type' => 'string', 'required' => true,),
            'turnclock' => array('type' => 'string', 'required' => true,),
            'turnwarning' => array('type' => 'string', 'required' => true,),
            'bankclock' => array('type' => 'string', 'required' => true,),
            'banksync' => array('type' => 'string', 'required' => true,),
            'bankreset' => array('type' => 'string', 'required' => true,),
            'disprotect' => array('type' => 'string', 'required' => true,),
            'levelduration' => array('type' => 'string', 'required' => true,),
            'rebuylevels' => array('type' => 'string', 'required' => true,),
            'threshold' => array('type' => 'string', 'required' => true,),
            'maxrebuys' => array('type' => 'string', 'required' => true,),
            'rebuycost' => array('type' => 'string', 'required' => true,),
            'rebuyfee' => array('type' => 'string', 'required' => true,),
            'breaktime' => array('type' => 'string', 'required' => true,),
            'breakinterval' => array('type' => 'string', 'required' => true,),
            'breaksync' => array('type' => 'string', 'required' => true,),
            'stoponchop' => array('type' => 'string', 'required' => true,),
            'propchop' => array('type' => 'string', 'required' => true,),
            'bringinpercent' => array('type' => 'string', 'required' => true,),
            'blinds' => array('type' => 'string', 'required' => true,),
            'payout' => array('type' => 'string', 'required' => true,),
            'payoutfractions' => array('type' => 'string', 'required' => true,),
            'payouttickets' => array('type' => 'string', 'required' => true,),
            'unreglogout' => array('type' => 'string', 'required' => true,),
            'tablegraphic' => array('type' => 'string', 'required' => true,),
            'tablegraphicfinal' => array('type' => 'string', 'required' => true,),
            'note' => array('type' => 'string', 'required' => true,),

        )
    ));


    register_rest_route('pokerapi/v1', '/edittableturnaments/', array(
        'methods' => 'POST',
        'callback' => 'editturnaments_games_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'gameid' => array('type' => 'string', 'required' => true,),
            'description' => array('type' => 'string', 'required' => true,),
            'autostart' => array('type' => 'string', 'required' => true,),
            'gametype' => array('type' => 'string', 'required' => true,),
            'mixedlist' => array('type' => 'string', 'required' => true,),
            'shootout' => array('type' => 'string', 'required' => true,),
            'password' => array('type' => 'string', 'required' => true,),
            'private' => array('type' => 'string', 'required' => true,),
            'permregister' => array('type' => 'string', 'required' => true,),
            'permunregister' => array('type' => 'string', 'required' => true,),
            'permobserve' => array('type' => 'string', 'required' => true,),
            'permplayerchat' => array('type' => 'string', 'required' => true,),
            'permobserverchat' => array('type' => 'string', 'required' => true,),
            'suspendchatallin' => array('type' => 'string', 'required' => true,),
            'tables' => array('type' => 'string', 'required' => true,),
            'seats' => array('type' => 'string', 'required' => true,),
            'startfull' => array('type' => 'string', 'required' => true,),
            'startmin' => array('type' => 'string', 'required' => true,),
            'startcode' => array('type' => 'string', 'required' => true,),
            'starttime' => array('type' => 'string', 'required' => true,),
            'regminutes' => array('type' => 'string', 'required' => true,),
            'lateregminutes' => array('type' => 'string', 'required' => true,),
            'latepenalty' => array('type' => 'string', 'required' => true,),
            'minplayers' => array('type' => 'string', 'required' => true,),
            'recurminutes' => array('type' => 'string', 'required' => true,),
            'resetseconds' => array('type' => 'string', 'required' => true,),
            'maxruns' => array('type' => 'string', 'required' => true,),
            'noshowminutes' => array('type' => 'string', 'required' => true,),
            'primarycurrency' => array('type' => 'string', 'required' => true,),
            'buyin' => array('type' => 'string', 'required' => true,),
            'bounty' => array('type' => 'string', 'required' => true,),
            'entryfee' => array('type' => 'string', 'required' => true,),
            'ticket' => array('type' => 'string', 'required' => true,),
            'ticketrequired' => array('type' => 'string', 'required' => true,),
            'ticketfunded' => array('type' => 'string', 'required' => true,),
            'prizebonus' => array('type' => 'string', 'required' => true,),
            'multiplybonus' => array('type' => 'string', 'required' => true,),
            'startingchips' => array('type' => 'string', 'required' => true,),
            'bonusticket' => array('type' => 'string', 'required' => true,),
            'addonchips' => array('type' => 'string', 'required' => true,),
            'turnclock' => array('type' => 'string', 'required' => true,),
            'turnwarning' => array('type' => 'string', 'required' => true,),
            'bankclock' => array('type' => 'string', 'required' => true,),
            'banksync' => array('type' => 'string', 'required' => true,),
            'bankreset' => array('type' => 'string', 'required' => true,),
            'disprotect' => array('type' => 'string', 'required' => true,),
            'levelduration' => array('type' => 'string', 'required' => true,),
            'rebuylevels' => array('type' => 'string', 'required' => true,),
            'threshold' => array('type' => 'string', 'required' => true,),
            'maxrebuys' => array('type' => 'string', 'required' => true,),
            'rebuycost' => array('type' => 'string', 'required' => true,),
            'rebuyfee' => array('type' => 'string', 'required' => true,),
            'breaktime' => array('type' => 'string', 'required' => true,),
            'breakinterval' => array('type' => 'string', 'required' => true,),
            'breaksync' => array('type' => 'string', 'required' => true,),
            'stoponchop' => array('type' => 'string', 'required' => true,),
            'propchop' => array('type' => 'string', 'required' => true,),
            'bringinpercent' => array('type' => 'string', 'required' => true,),
            'blinds' => array('type' => 'string', 'required' => true,),
            'payout' => array('type' => 'string', 'required' => true,),
            'payoutfractions' => array('type' => 'string', 'required' => true,),
            'payouttickets' => array('type' => 'string', 'required' => true,),
            'unreglogout' => array('type' => 'string', 'required' => true,),
            'tablegraphic' => array('type' => 'string', 'required' => true,),
            'tablegraphicfinal' => array('type' => 'string', 'required' => true,),
            'note' => array('type' => 'string', 'required' => true,),

        )
    ));

    /*-------------Users----------------------*/


    register_rest_route('pokerapi/v1', '/allbalance/', array(
        'methods' => 'POST',
        'callback' => 'get_balance_all_player',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('pokerapi/v1', '/balancetransfer/', array(
        'methods' => 'POST',
        'callback' => 'balance_transfer',
        'permission_callback' => '__return_true',
        'args' => array(
            'iam' => array('type' => 'string', 'required' => true,),
            'username' => array('type' => 'string', 'required' => true,),
            'amount' => array('type' => 'string', 'required' => true,),

        )
    ));


    register_rest_route('pokerapi/v1', '/totalrake/', array(
        'methods' => 'POST',
        'callback' => 'total_rake',
        'permission_callback' => '__return_true',
        'args' => array(
            'totalrake' => array('type' => 'float', 'required' => true,),

        )
    ));


    register_rest_route('pokerapi/v1', '/allbalanceplayers/', array(
        'methods' => 'GET',
        'callback' => 'get_balance_players',
        'permission_callback' => '__return_true',
    ));


    register_rest_route('pokerapi/v1', '/authplayer/', array(
        'methods' => 'POST',
        'callback' => 'get_auth_player',
        'permission_callback' => '__return_true',
        'args' => array(
            'username' => array('type' => 'string', 'required' => true,),
            'password' => array('type' => 'string', 'required' => true,),


        )
    ));


    register_rest_route('pokerapi/v1', '/authsession/', array(
        'methods' => 'POST',
        'callback' => 'get_auth_session',
        'permission_callback' => '__return_true',
        'args' => array(
            'token' => array('type' => 'string', 'required' => true,),
            // 'password' => array('type' => 'string','required' => true,),


        )
    ));


    register_rest_route('pokerapi/v1', '/getallpleyers/', array(
        'methods' => 'GET',
        'callback' => 'get_all_players_func',
        'permission_callback' => '__return_true',
    ));


    register_rest_route('pokerapi/v1', '/addplayer/', array(
        'methods' => 'POST',
        'callback' => 'addplayers_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),
            'adminprofile' => array('type' => 'string', 'required' => true,),
            'title' => array('type' => 'string', 'required' => true,),
            'level' => array('type' => 'string', 'required' => true,),
            'realname' => array('type' => 'string', 'required' => true,),
            'password' => array('type' => 'string', 'required' => true,),
            'location' => array('type' => 'string', 'required' => true,),
            'email' => array('type' => 'string', 'required' => true,),
            'valcode' => array('type' => 'string', 'required' => true,),
            'balance' => array('type' => 'string', 'required' => true,),
            'balance2' => array('type' => 'string', 'required' => true,),
            'lastreset' => array('type' => 'string', 'required' => true,),
            'lastreset2' => array('type' => 'string', 'required' => true,),
            'avatar' => array('type' => 'string', 'required' => true,),
            'avatarfile' => array('type' => 'string', 'required' => true,),
            'logins' => array('type' => 'string', 'required' => true,),
            'firstlogin' => array('type' => 'string', 'required' => true,),
            'lastlogin' => array('type' => 'string', 'required' => true,),
            'gender' => array('type' => 'string', 'required' => true,),
            'permissions' => array('type' => 'string', 'required' => true,),
            'tickets' => array('type' => 'string', 'required' => true,),
            'chipstransfer' => array('type' => 'string', 'required' => true,),
            'chipstransfer2' => array('type' => 'string', 'required' => true,),
            'chipsaccept' => array('type' => 'string', 'required' => true,),
            'chipsaccept2' => array('type' => 'string', 'required' => true,),
            'chat' => array('type' => 'string', 'required' => true,),
            'chatcolor1' => array('type' => 'string', 'required' => true,),
            'chatcolor2' => array('type' => 'string', 'required' => true,),
            'custom' => array('type' => 'string', 'required' => true,),
            'note' => array('type' => 'string', 'required' => true,),
            'erake' => array('type' => 'string', 'required' => true,),
            'erake2' => array('type' => 'string', 'required' => true,),
            'prake' => array('type' => 'string', 'required' => true,),
            'prake2' => array('type' => 'string', 'required' => true,),
            'tfees' => array('type' => 'string', 'required' => true,),
            'tfees2' => array('type' => 'string', 'required' => true,),

        )
    ));


    register_rest_route('pokerapi/v1', '/editplayer/', array(
        'methods' => 'POST',
        'callback' => 'editplayers_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),
            'adminprofile' => array('type' => 'string', 'required' => true,),
            'title' => array('type' => 'string', 'required' => true,),
            'level' => array('type' => 'string', 'required' => true,),
            'realname' => array('type' => 'string', 'required' => true,),
            'password' => array('type' => 'string', 'required' => true,),
            'location' => array('type' => 'string', 'required' => true,),
            'email' => array('type' => 'string', 'required' => true,),
            'valcode' => array('type' => 'string', 'required' => true,),
            'balance' => array('type' => 'string', 'required' => true,),
            'balance2' => array('type' => 'string', 'required' => true,),
            'lastreset' => array('type' => 'string', 'required' => true,),
            'lastreset2' => array('type' => 'string', 'required' => true,),
            'avatar' => array('type' => 'string', 'required' => true,),
            'avatarfile' => array('type' => 'string', 'required' => true,),
            'logins' => array('type' => 'string', 'required' => true,),
            'firstlogin' => array('type' => 'string', 'required' => true,),
            'lastlogin' => array('type' => 'string', 'required' => true,),
            'gender' => array('type' => 'string', 'required' => true,),
            'permissions' => array('type' => 'string', 'required' => true,),
            'tickets' => array('type' => 'string', 'required' => true,),
            'chipstransfer' => array('type' => 'string', 'required' => true,),
            'chipstransfer2' => array('type' => 'string', 'required' => true,),
            'chipsaccept' => array('type' => 'string', 'required' => true,),
            'chipsaccept2' => array('type' => 'string', 'required' => true,),
            'chat' => array('type' => 'string', 'required' => true,),
            'chatcolor1' => array('type' => 'string', 'required' => true,),
            'chatcolor2' => array('type' => 'string', 'required' => true,),
            'custom' => array('type' => 'string', 'required' => true,),
            'note' => array('type' => 'string', 'required' => true,),
            'erake' => array('type' => 'string', 'required' => true,),
            'erake2' => array('type' => 'string', 'required' => true,),
            'prake' => array('type' => 'string', 'required' => true,),
            'prake2' => array('type' => 'string', 'required' => true,),
            'tfees' => array('type' => 'string', 'required' => true,),
            'tfees2' => array('type' => 'string', 'required' => true,),

        )
    ));


    register_rest_route('pokerapi/v1', '/deletplayer/', array(
        'methods' => 'POST',
        'callback' => 'del_player_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/logoutplayer/', array(
        'methods' => 'POST',
        'callback' => 'logout_player_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/getsessionlayer/', array(
        'methods' => 'POST',
        'callback' => 'session_player_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'session' => array(
                'type' => 'string',
                'required' => true,
            )
        )
    ));


    register_rest_route('pokerapi/v1', '/resetrake/', array(
        'methods' => 'POST',
        'callback' => 'reset_all_rake',
        'permission_callback' => '__return_true',

    ));


    register_rest_route('pokerapi/v1', '/resetrakeuser/', array(
        'methods' => 'POST',
        'callback' => 'reset_user_rake',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),
            'lastreset' => array('type' => 'string', 'required' => true,),

        )
    ));

    register_rest_route('pokerapi/v1', '/getuserforedit/', array(
        'methods' => 'POST',
        'callback' => 'get_user_for_edit',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),


        )
    ));


    register_rest_route('pokerapi/v1', '/incbalanceplayer/', array(
        'methods' => 'POST',
        'callback' => 'increment_player_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),
            'summa' => array('type' => 'string', 'required' => true,),


        )
    ));


    register_rest_route('pokerapi/v1', '/decbalanceplayer/', array(
        'methods' => 'POST',
        'callback' => 'decrement_player_func',
        'permission_callback' => '__return_true',
        'args' => array(
            'player' => array('type' => 'string', 'required' => true,),
            'summa' => array('type' => 'string', 'required' => true,),


        )
    ));

    register_rest_route('pokerapi/v1', '/getipplayer/', array(
        'methods' => 'POST',
        'callback' => 'get_user_ip',
        'permission_callback' => '__return_true',

    ));


    register_rest_route('pokerapi/v1', '/conectedallpleyers/', array(
        'methods' => 'POST',
        'callback' => 'conected_player_func',
        'permission_callback' => '__return_true',

    ));
});


// Редактировать таблицу
function edittable_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "RingGamesEdit",
        "Name" => $parameters['name'],
        "Description" => $parameters['description'],
        "Auto" => $parameters['auto'],
        "Game" => $parameters['game'],
        "MixedList" => $parameters['mixedlist'],
        "MixedHands" => $parameters['mixedhands'],
        "PW" => $parameters['pw'],
        "Private" => $parameters['private'],
        "PermPlay" => $parameters['permplay'],
        "PermObserve" => $parameters['permobserve'],
        "PermPlayerChat" => $parameters['permplayerchat'],
        "PermObserverChat" => $parameters['permobserverchat'],
        "SuspendChatAllIn" => $parameters['suspendchatallin'],
        "Seats" => $parameters['seats'],
        "PrimaryCurrency" => $parameters['primarycurrency'],
        "SmallestChip" => $parameters['smallestchip'],
        "BuyInMin" => $parameters['buyinmin'],
        "BuyInMax" => $parameters['buyinmax'],
        "BuyInDef" => $parameters['buyindef'],
        "CapLimit" => $parameters['caplimit'],
        "RakePercent" => $parameters['rakepercent'],
        "RakeCap" => $parameters['rakecap'],
        "TurnClock" => $parameters['turnclock'],
        "TurnWarning" => $parameters['turnwarning'],
        "TimeBank" => $parameters['timebank'],
        "BankSync" => $parameters['banksync'],
        "BankReset" => $parameters['bankreset'],
        "DisProtect" => $parameters['disprotect'],
        "SmallBlind" => $parameters['smallblind'],
        "BigBlind" => $parameters['bigblind'],
        "AllowStraddle" => $parameters['allowstraddle'],
        "SmallBet" => $parameters['smallbet'],
        "BigBet" => $parameters['bigbet'],
        "Ante" => $parameters['ante'],
        "AnteAll" => $parameters['anteall'],
        "BringIn" => $parameters['bringin'],
        "DupeIPs" => $parameters['dupeips'],
        "RatholeMinutes" => $parameters['ratholeminutes'],
        "SitoutMinutes" => $parameters['sitoutminutes'],
        "SitoutRelaxed" => $parameters['sitoutrelaxed'],
        "TableGraphic" => $parameters['tablegraphic'],
        "Note" => $parameters['note'],
        "NewName" => $parameters['newname']
    );
    return Poker_API($params);
}


// Добавить таблицу
function addtable_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "RingGamesAdd",
        "Name" => $parameters['name'],
        "Description" => $parameters['description'],
        "Auto" => $parameters['auto'],
        "Game" => $parameters['game'],
        "MixedList" => $parameters['mixedlist'],
        "MixedHands" => $parameters['mixedhands'],
        "PW" => $parameters['pw'],
        "Private" => $parameters['private'],
        "PermPlay" => $parameters['permplay'],
        "PermObserve" => $parameters['permobserve'],
        "PermPlayerChat" => $parameters['permplayerchat'],
        "PermObserverChat" => $parameters['permobserverchat'],
        "SuspendChatAllIn" => $parameters['suspendchatallin'],
        "Seats" => $parameters['seats'],
        "PrimaryCurrency" => $parameters['primarycurrency'],
        "SmallestChip" => $parameters['smallestchip'],
        "BuyInMin" => $parameters['buyinmin'],
        "BuyInMax" => $parameters['buyinmax'],
        "BuyInDef" => $parameters['buyindef'],
        "CapLimit" => $parameters['caplimit'],
        "RakePercent" => $parameters['rakepercent'],
        "RakeCap" => $parameters['rakecap'],
        "TurnClock" => $parameters['turnclock'],
        "TurnWarning" => $parameters['turnwarning'],
        "TimeBank" => $parameters['timebank'],
        "BankSync" => $parameters['banksync'],
        "BankReset" => $parameters['bankreset'],
        "DisProtect" => $parameters['disprotect'],
        "SmallBlind" => $parameters['smallblind'],
        "BigBlind" => $parameters['bigblind'],
        "AllowStraddle" => $parameters['allowstraddle'],
        "SmallBet" => $parameters['smallbet'],
        "BigBet" => $parameters['bigbet'],
        "Ante" => $parameters['ante'],
        "AnteAll" => $parameters['anteall'],
        "BringIn" => $parameters['bringin'],
        "DupeIPs" => $parameters['dupeips'],
        "RatholeMinutes" => $parameters['ratholeminutes'],
        "SitoutMinutes" => $parameters['sitoutminutes'],
        "SitoutRelaxed" => $parameters['sitoutrelaxed'],
        "TableGraphic" => $parameters['tablegraphic'],
        "Note" => $parameters['note']
    );
    return Poker_API($params);
}


// Сообщение на стол
function message_for_table_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "RingGamesMessage", "Name" => $parameters['name'], "Message" => $parameters['message']);
    return Poker_API($params);
}


// Перевод стола в онлайн
function online_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "RingGamesOnline", "Name" => $parameters['name']);
    return Poker_API($params);
}


// Перевод стола в офлайн
function offline_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "RingGamesOffline", "Name" => $parameters['name'], "Now" => "Yes");
    return Poker_API($params);
}


// Удаление стола
function del_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "RingGamesDelete", "Name" => $parameters['name']);
    return Poker_API($params);
}


// Обрабатывает запрос
function my_awesome_func()
{
    $params = array("Command" => "RingGamesList", "Fields" => "Name");
    $api = Poker_API($params);
    $names = $api->Name;
    $var = [];
    foreach ($names as $key => $value) {
        $param = array("Command" => "RingGamesGet", "Name" => $value);
        $apl = Poker_API($param);
        array_push($var, $apl);
    }
    return $var;
}

// Получение одной игры
function get_ringgames_for_edit(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "RingGamesGet",
        "Name" => $parameters['name']
    );
    return Poker_API($params);
}


/*-----------------------------------Tournaments-----------------------------------*/


// Получение одного турнира
function get_tournment_one_games_for_edit(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "TournamentsGet",
        "Name" => $parameters['name']
    );
    return Poker_API($params);
}

// Получение турниров
function get_tournaments_api()
{
    $params = array("Command" => "TournamentsList", "Fields" => "Name");
    $api = Poker_API($params);
    $names = $api->Name;
    $var = [];
    foreach ($names as $key => $value) {
        $param = array("Command" => "TournamentsGet", "Name" => $value);
        $apl = Poker_API($param);
        array_push($var, $apl);
    }
    return $var;
}

// Удаление турнира
function del_tournaments_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "TournamentsDelete", "Name" => $parameters['name']);
    return Poker_API($params);
}


// Перевод стола турнира в онлайн
function online_tournaments_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "TournamentsOnline", "Name" => $parameters['name']);
    return Poker_API($params);
}


// Перевод стола турнира в офлайн
function offline_tournaments_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "TournamentsOffline", "Name" => $parameters['name'], "Now" => "Yes");
    return Poker_API($params);
}

// Сообщение на стол турнира
function message_for_table_tournaments_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "TournamentsMessage", "Name" => $parameters['name'], "Message" => $parameters['message']);
    return Poker_API($params);
}

// Добавить турнир
function addturnaments_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "TournamentsAdd",
        "Name" => $parameters['gameid'],
        "Description" => $parameters['description'],
        "Auto" => $parameters['autostart'],
        "Game" => $parameters['gametype'],
        "MixedList" => $parameters['mixedlist'],
        "Shootout" => $parameters['shootout'],
        "PW" => $parameters['password'],
        "Private" => $parameters['private'],
        "PermRegister" => $parameters['permregister'],
        "PermUnregister" => $parameters['permunregister'],
        "PermObserve" => $parameters['permobserve'],
        "PermPlayerChat" => $parameters['permplayerchat'],
        "PermObserverChat" => $parameters['permobserverchat'],
        "SuspendChatAllIn" => $parameters['suspendchatallin'],
        "Tables" => $parameters['tables'],
        "Seats" => $parameters['seats'],
        "StartFull" => $parameters['startfull'],
        "StartMin" => $parameters['startmin'],
        "StartCode" => $parameters['startcode'],
        "StartTime" => $parameters['starttime'],
        "RegMinutes" => $parameters['regminutes'],
        "LateRegMinutes" => $parameters['lateregminutes'],
        "LatePenalty" => $parameters['latepenalty'],
        "MinPlayers" => $parameters['minplayers'],
        "RecurMinutes" => $parameters['recurminutes'],
        "ResetSeconds" => $parameters['resetseconds'],
        "MaxRuns" => $parameters['maxruns'],
        "NoShowMinutes" => $parameters['noshowminutes'],
        "PrimaryCurrency" => $parameters['primarycurrency'],
        "BuyIn" => $parameters['buyin'],
        "Bounty" => $parameters['bounty'],
        "EntryFee" => $parameters['entryfee'],
        "Ticket" => $parameters['ticket'],
        "TicketRequired" => $parameters['ticketrequired'],
        "TicketFunded" => $parameters['ticketfunded'],
        "PrizeBonus" => $parameters['prizebonus'],
        "MultiplyBonus" => $parameters['multiplybonus'],
        "Chips" => $parameters['startingchips'],
        "BonusTicket" => $parameters['bonusticket'],
        "AddOnChips" => $parameters['addonchips'],
        "TurnClock" => $parameters['turnclock'],
        "TurnWarning" => $parameters['turnwarning'],
        "TimeBank" => $parameters['bankclock'],
        "BankSync" => $parameters['banksync'],
        "BankReset" => $parameters['bankreset'],
        "DisProtect" => $parameters['disprotect'],
        "Level" => $parameters['levelduration'],
        "RebuyLevels" => $parameters['rebuylevels'],
        "Threshold" => $parameters['threshold'],
        "MaxRebuys" => $parameters['maxrebuys'],
        "RebuyCost" => $parameters['rebuycost'],
        "RebuyFee" => $parameters['rebuyfee'],
        "BreakTime" => $parameters['breaktime'],
        "BreakInterval" => $parameters['breakinterval'],
        "BreakSync" => $parameters['breaksync'],
        "StopOnChop" => $parameters['stoponchop'],
        "PropChop" => $parameters['propchop'],
        "BringInPercent" => $parameters['bringinpercent'],
        "Blinds" => $parameters['blinds'],
        "Payout" => $parameters['payout'],
        "PayoutFractions" => $parameters['payoutfractions'],
        "PayoutTickets" => $parameters['payouttickets'],
        "UnregLogout" => $parameters['unreglogout'],
        "TableGraphic" => $parameters['tablegraphic'],
        "TableGraphicFinal" => $parameters['tablegraphicfinal'],
        "Note" => $parameters['note']
    );
    return Poker_API($params);
}


// Редактировать турнир
function editturnaments_games_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "TournamentsEdit",
        "Name" => $parameters['gameid'],
        "Description" => $parameters['description'],
        "Auto" => $parameters['autostart'],
        "Game" => $parameters['gametype'],
        "MixedList" => $parameters['mixedlist'],
        "Shootout" => $parameters['shootout'],
        "PW" => $parameters['password'],
        "Private" => $parameters['private'],
        "PermRegister" => $parameters['permregister'],
        "PermUnregister" => $parameters['permunregister'],
        "PermObserve" => $parameters['permobserve'],
        "PermPlayerChat" => $parameters['permplayerchat'],
        "PermObserverChat" => $parameters['permobserverchat'],
        "SuspendChatAllIn" => $parameters['suspendchatallin'],
        "Tables" => $parameters['tables'],
        "Seats" => $parameters['seats'],
        "StartFull" => $parameters['startfull'],
        "StartMin" => $parameters['startmin'],
        "StartCode" => $parameters['startcode'],
        "StartTime" => $parameters['starttime'],
        "RegMinutes" => $parameters['regminutes'],
        "LateRegMinutes" => $parameters['lateregminutes'],
        "LatePenalty" => $parameters['latepenalty'],
        "MinPlayers" => $parameters['minplayers'],
        "RecurMinutes" => $parameters['recurminutes'],
        "ResetSeconds" => $parameters['resetseconds'],
        "MaxRuns" => $parameters['maxruns'],
        "NoShowMinutes" => $parameters['noshowminutes'],
        "PrimaryCurrency" => $parameters['primarycurrency'],
        "BuyIn" => $parameters['buyin'],
        "Bounty" => $parameters['bounty'],
        "EntryFee" => $parameters['entryfee'],
        "Ticket" => $parameters['ticket'],
        "TicketRequired" => $parameters['ticketrequired'],
        "TicketFunded" => $parameters['ticketfunded'],
        "PrizeBonus" => $parameters['prizebonus'],
        "MultiplyBonus" => $parameters['multiplybonus'],
        "Chips" => $parameters['startingchips'],
        "BonusTicket" => $parameters['bonusticket'],
        "AddOnChips" => $parameters['addonchips'],
        "TurnClock" => $parameters['turnclock'],
        "TurnWarning" => $parameters['turnwarning'],
        "TimeBank" => $parameters['bankclock'],
        "BankSync" => $parameters['banksync'],
        "BankReset" => $parameters['bankreset'],
        "DisProtect" => $parameters['disprotect'],
        "Level" => $parameters['levelduration'],
        "RebuyLevels" => $parameters['rebuylevels'],
        "Threshold" => $parameters['threshold'],
        "MaxRebuys" => $parameters['maxrebuys'],
        "RebuyCost" => $parameters['rebuycost'],
        "RebuyFee" => $parameters['rebuyfee'],
        "BreakTime" => $parameters['breaktime'],
        "BreakInterval" => $parameters['breakinterval'],
        "BreakSync" => $parameters['breaksync'],
        "StopOnChop" => $parameters['stoponchop'],
        "PropChop" => $parameters['propchop'],
        "BringInPercent" => $parameters['bringinpercent'],
        "Blinds" => $parameters['blinds'],
        "Payout" => $parameters['payout'],
        "PayoutFractions" => $parameters['payoutfractions'],
        "PayoutTickets" => $parameters['payouttickets'],
        "UnregLogout" => $parameters['unreglogout'],
        "TableGraphic" => $parameters['tablegraphic'],
        "TableGraphicFinal" => $parameters['tablegraphicfinal'],
        "Note" => $parameters['note']
    );
    return Poker_API($params);
}

/*----------------------- Players ---------------------------*/

// Авторизация
function get_auth_player(WP_REST_Request $request)

{
    $parameters = $request->get_query_params();
    $users = get_user_by('login', $parameters['username']);
    if (isset($users->ID)) {
        $user = get_userdata($users->ID);
        if ($user) {
            $password = $parameters['password'];
            $hash = $user->data->user_pass;
            if (wp_check_password($password, $hash)) {
                wp_set_auth_cookie($users->ID);
                return wp_generate_auth_cookie($users->ID, 12);
            }
            return "Password Error";
        }
    }

    return "Login Error";
}


// Получение сессии для покера лобби
// function get_auth_session(WP_REST_Request $request)

// {   
// 	$parameters = $request->get_query_params();
// 	$users = get_user_by('login', $parameters['username']) ;		
// 		if(isset ($users->ID)){
// 			$user = get_userdata($users->ID);
// if($user){
// 	$password = $parameters['password'];
// 	$hash     = $user->data->user_pass;
// 	if ( wp_check_password( $password, $hash ) )
// 	{ 

// 	$params = array("Command" => "AccountsPassword", "Player" => $parameters['username'], "PW" => $hash);
//     $api = Poker_API($params);
//     if ($api -> Result != "Ok") die($api -> Error . "<br/>" . "Click Back Button to retry.");
//     if ($api -> Verified != "Yes") die("Password is incorrect. Click Back Button to retry.");
//     $params = array("Command" => "AccountsSessionKey", "Player" => $parameters['username']);
//     $api = Poker_API($params);
//     if ($api -> Result != "Ok") die($api -> Error . "<br/>" . "Click Back Button to retry.");
//     $key = $api -> SessionKey;
//     return ['session'=>$key,'name'=>$parameters['username']];


// 	}
// 	return "Password Error";

// }

// 		}

//  	return "Login Error";

// }


function get_auth_session(WP_REST_Request $request)

{
    $parameters = $request->get_query_params();
    if (isset($parameters['token'])) {
        $pieces = explode("|", $parameters['token']);
        $users = get_user_by('login', $pieces[0]);
        if (isset($users->ID)) {
            $user = get_userdata($users->ID);
            if (user_can($users->ID, 'manage_options')) {

                $hash = $users->user_pass;

                $params = array("Command" => "AccountsPassword", "Player" => $pieces[0], "PW" => $hash);
                $api = Poker_API($params);
//                if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
//                if ($api->Verified != "Yes") die("Password is incorrect. Click Back Button to retry.");
                $params = array("Command" => "AccountsSessionKey", "Player" => $pieces[0]);
                $api = Poker_API($params);
                if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");

                $balan_params = array("Command" => "AccountsList", "Players" => $pieces[0], "Fields" => "Balance");

                $api_balance = Poker_API($balan_params);

                $key = $api->SessionKey;
                return ['session' => $key, 'name' => $pieces[0], 'role' => 'admin', 'balance' => (string)$api_balance->Balance[0]];
            }

            $hash = $users->user_pass;

            $params = array("Command" => "AccountsPassword", "Player" => $pieces[0], "PW" => $hash);
            $api = Poker_API($params);
//            if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
//            if ($api->Verified != "Yes") die("Password is incorrect. Click Back Button to retry.");
            $params = array("Command" => "AccountsSessionKey", "Player" => $pieces[0]);
            $api = Poker_API($params);
            if ($api->Result != "Ok") die($api->Error . "<br/>" . "Click Back Button to retry.");
            $balan_params = array("Command" => "AccountsList", "Players" => $pieces[0], "Fields" => "Balance");

            $api_balance = Poker_API($balan_params);

            $key = $api->SessionKey;
            return ['session' => $key, 'name' => $pieces[0], 'role' => 'editor', 'balance' => (string)$api_balance->Balance[0]];
        }

        return "Login Error";
    }
}


// // Получение Играков
// function get_all_players_func()
// {
//     $params = array("Command" => "AccountsList", "Fields" => "Player");
//     $api = Poker_API($params);
//     $players = $api->Player;
//     $var = [];
//     foreach ($players as $value) {
//         $param = array("Command" => "AccountsGet", "Player" => $value);
//         $apl = Poker_API($param);
//         array_push($var, $apl);
//     }
//     return $var;
// }


// Получение Играков
function get_all_players_func()
{
    $params = array("Command" => "AccountsList", "Fields" => "Player");
    $api = Poker_API($params);
    $players = $api->Player;
    $comma_separated = implode(",", $players);

    $param = array("Command" => "AccountsList", "Player" => $comma_separated, "Fields" => "Player,AdminProfile,Title,Level,RealName,PWHash,Location,Email,ValCode,Balance,Balance2,LastReset,LastReset2,Avatar,AvatarFile,Logins,FirstLogin,LastLogin,Gender,Permissions,Tickets,ChipsTransfer,ChipsTransfer2,ChipsAccept,ChipsAccept2,Chat,ChatColor1,ChatColor2,Custom,Note,ERake,ERake2,PRake,PRake2,TFees,TFees2,RingChips,RingChips2,RegChips,RegChips2,SessionID");
    $apl = Poker_API($param);
    $r = [];

    for ($i = 0; $i < $apl->Accounts; $i++) {

        $newcls[$i] = new stdClass();
        $newcls[$i]->Player = $apl->Player[$i];
        $newcls[$i]->Balance = $apl->Balance[$i];
        $newcls[$i]->ERake = $apl->ERake[$i];
        $newcls[$i]->PRake = $apl->PRake[$i];
        $newcls[$i]->Location = $apl->Location[$i];
        $newcls[$i]->RealName = $apl->RealName[$i];
        $newcls[$i]->Email = $apl->Email[$i];
        $newcls[$i]->Balance2 = $apl->Balance2[$i];
        $newcls[$i]->Avatar = $apl->Avatar[$i];
        $newcls[$i]->Logins = $apl->Logins[$i];
        $newcls[$i]->FirstLogin = $apl->FirstLogin[$i];
        $newcls[$i]->LastLogin = $apl->LastLogin[$i];
        $newcls[$i]->ERake2 = $apl->ERake2[$i];
        $newcls[$i]->PRake2 = $apl->PRake2[$i];
        $newcls[$i]->Chat = $apl->Chat[$i];
        $newcls[$i]->Note = $apl->Note[$i];
        $newcls[$i]->LastReset = $apl->LastReset[$i];
        $newcls[$i]->LastReset2 = $apl->LastReset2[$i];
        $newcls[$i]->TFees = $apl->TFees[$i];
        $newcls[$i]->TFees2 = $apl->TFees2[$i];
        $newcls[$i]->Gender = $apl->Gender[$i];
        $newcls[$i]->ChipsTransfer = $apl->ChipsTransfer[$i];
        $newcls[$i]->ChipsAccept = $apl->ChipsAccept[$i];


        $r[] = $newcls[$i];
    }
    return $r;
}


// Добавить Игрока
function addplayers_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();


    wp_insert_user(
        array(
            'user_login' => $parameters['player'],
            'user_email' => $parameters['email'],
            'user_pass' => $parameters['password'],
            'first_name' => $parameters['realname'],
            'nickname' => $parameters['player'],
            'description' => $parameters['location']
        )
    );

    $user = get_user_by('login', $parameters['player']);
    $hash = $user->user_pass;
    $params = array(
        "Command" => "AccountsAdd",
        "Player" => $parameters['player'],
        "AdminProfile" => $parameters['adminprofile'],
        "Title" => $parameters['title'],
        "Level" => $parameters['level'],
        "RealName" => $parameters['realname'],
        "PW" => $hash,
        "Location" => $parameters['location'],
        "Email" => $parameters['email'],
        "ValCode" => $parameters['valcode'],
        "Balance" => $parameters['balance'],
        "Balance2" => $parameters['balance2'],
        "LastReset" => $parameters['lastreset'],
        "LastReset2" => $parameters['lastreset2'],
        "Avatar" => $parameters['avatar'],
        "AvatarFile" => $parameters['avatarfile'],
        "Logins" => $parameters['logins'],
        "FirstLogin" => $parameters['firstlogin'],
        "LastLogin" => $parameters['lastlogin'],
        "Gender" => $parameters['gender'],
        "Permissions" => $parameters['permissions'],
        "Tickets" => $parameters['tickets'],
        "ChipsTransfer" => $parameters['chipstransfer'],
        "ChipsTransfer2" => $parameters['chipstransfer2'],
        "ChipsAccept" => $parameters['chipsaccept'],
        "ChipsAccept2" => $parameters['chipsaccept2'],
        "Chat" => $parameters['chat'],
        "ChatColor1" => $parameters['chatcolor1'],
        "ChatColor2" => $parameters['chatcolor2'],
        "Custom" => $parameters['custom'],
        "Note" => $parameters['note'],
        "ERake" => $parameters['erake'],
        "ERake2" => $parameters['erake2'],
        "PRake" => $parameters['prake'],
        "PRake2" => $parameters['prake2'],
        "TFees" => $parameters['tfees'],
        "TFees2" => $parameters['tfees2'],
    );


    return Poker_API($params);
}


// Редактировать Игрока
function editplayers_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "AccountsEdit",
        "Player" => $parameters['player'],
        "AdminProfile" => $parameters['adminprofile'],
        "Title" => $parameters['title'],
        "Level" => $parameters['level'],
        "RealName" => $parameters['realname'],
        "PW" => $parameters['password'],
        "Location" => $parameters['location'],
        "Email" => $parameters['email'],
        "ValCode" => $parameters['valcode'],
        "Balance" => $parameters['balance'],
        "Balance2" => $parameters['balance2'],
        "LastReset" => $parameters['lastreset'],
        "LastReset2" => $parameters['lastreset2'],
        "Avatar" => $parameters['avatar'],
        "AvatarFile" => $parameters['avatarfile'],
        "Logins" => $parameters['logins'],
        "FirstLogin" => $parameters['firstlogin'],
        "LastLogin" => $parameters['lastlogin'],
        "Gender" => $parameters['gender'],
        "Permissions" => $parameters['permissions'],
        "Tickets" => $parameters['tickets'],
        "ChipsTransfer" => $parameters['chipstransfer'],
        "ChipsTransfer2" => $parameters['chipstransfer2'],
        "ChipsAccept" => $parameters['chipsaccept'],
        "ChipsAccept2" => $parameters['chipsaccept2'],
        "Chat" => $parameters['chat'],
        "ChatColor1" => $parameters['chatcolor1'],
        "ChatColor2" => $parameters['chatcolor2'],
        "Custom" => $parameters['custom'],
        "Note" => $parameters['note'],
        "ERake" => $parameters['erake'],
        "ERake2" => $parameters['erake2'],
        "PRake" => $parameters['prake'],
        "PRake2" => $parameters['prake2'],
        "TFees" => $parameters['tfees'],
        "TFees2" => $parameters['tfees2'],
    );
    return Poker_API($params);
}


// Удаление игрока
function del_player_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "AccountsDelete", "Player" => $parameters['player']);
    $user = get_user_by('login', $parameters['player']);

    if (isset($user->ID)) {
        wp_delete_user($user->ID);
    }

    return Poker_API($params);
}


// Получение сессии
function session_player_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array("Command" => "ConnectionsGet", "SessionID" => $parameters['session']);
    return Poker_API($params);
}


// Increment money
function increment_player_func(WP_REST_Request $request)
{
    global $wpdb;
    date_default_timezone_set('Europe/Athens');
    $today = date("Y-m-d H:i:s");
    $parameters = $request->get_query_params();
    $params = array("Command" => "AccountsIncBalance", "Player" => $parameters['player'], "Amount" => $parameters['summa']);

    $p = array("Command" => "AccountsGet", "Player" => $parameters['player']);
    $ap = Poker_API($p);

    $wpdb->replace(
        'wp_balance',
        array('agent' => $ap->Location, 'user' => $parameters['player'], 'balance' => $parameters['summa'], 'date' => $today),
        array('%s', '%s', '%f', '%s')
    );


    return Poker_API($params);
}

// Decrement money
function decrement_player_func(WP_REST_Request $request)
{
    global $wpdb;
    date_default_timezone_set('Europe/Athens');
    $today = date("Y-m-d H:i:s");
    $parameters = $request->get_query_params();


    $p = array("Command" => "AccountsGet", "Player" => $parameters['player']);
    $ap = Poker_API($p);
    if ($ap->Balance >= $parameters['summa']) {
        $params = array("Command" => "AccountsDecBalance", "Player" => $parameters['player'], "Amount" => $parameters['summa'], "Negative" => "Zero");
        $e = $parameters['summa'] * (-1);


        $wpdb->replace(
            'wp_balance',


            array('agent' => $ap->Location, 'user' => $parameters['player'], 'balance' => $e, 'date' => $today),
            array('%s', '%s', '%f', '%s')

        );
        return Poker_API($params);
    }

    return 'Error';
}


//Получение движение баланса
function get_balance_all_player()
{
    global $wpdb;
    $r = [];
    $da = $wpdb->get_col("SELECT date FROM  wp_balance");
    $us = $wpdb->get_col("SELECT user FROM  wp_balance");
    $balan = $wpdb->get_col("SELECT balance FROM  wp_balance");
    $agen = $wpdb->get_col("SELECT agent FROM  wp_balance");
    $id = $wpdb->get_col("SELECT id FROM  wp_balance");


    for ($i = 0; $i < count($da); $i++) {

        $newcls[$i] = new stdClass();
        $newcls[$i]->data = $da[$i];
        $newcls[$i]->name = $us[$i];
        $newcls[$i]->balance = $balan[$i];
        $newcls[$i]->agent = $agen[$i];
        $newcls[$i]->id = $id[$i];
        $r[] = $newcls[$i];
    }
    return $r;
}


//Получение движение баланса
function get_balance_players()
{
    global $wpdb;
    $r = [];
    $da = $wpdb->get_col("SELECT date FROM  wp_transiction");
    $us2 = $wpdb->get_col("SELECT user2 FROM  wp_transiction");
    $balan = $wpdb->get_col("SELECT amount FROM  wp_transiction");
    $us1 = $wpdb->get_col("SELECT user1 FROM  wp_transiction");
    $id = $wpdb->get_col("SELECT id FROM  wp_transiction");


    for ($i = 0; $i < count($da); $i++) {

        $newcls[$i] = new stdClass();
        $newcls[$i]->data = $da[$i];
        $newcls[$i]->user1 = $us1[$i];
        $newcls[$i]->balance = $balan[$i];
        $newcls[$i]->user2 = $us2[$i];
        $newcls[$i]->id = $id[$i];
        $r[] = $newcls[$i];
    }
    return $r;
}


//Очистка всего Рейка
function reset_all_rake()
{

    $parametr = array("Command" => "AccountsList", "Fields" => "Player");
    $api = Poker_API($parametr);
    $players = $api->Player;

    for ($i = 0; $i < count($players); $i++) {
        $params = array("Command" => "AccountsEdit", "Player" => $players[$i], "ERake" => 0);
        $api = Poker_API($params);
    }
    return 'ok';
}


// Сброс рейка игрока
function reset_user_rake(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "AccountsEdit",
        "Player" => $parameters['player'],
        "LastReset" => $parameters['lastreset'],
        "LastReset2" => $parameters['lastreset'],
        "Chat" => $parameters['lastreset'],
        "PRake" => '0'
    );
    return Poker_API($params);
}


// Получение одного игрока
function get_user_for_edit(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "AccountsGet",
        "Player" => $parameters['player']
    );
    return Poker_API($params);
}


// Получение играков в сети
function conected_player_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "ConnectionsList",
        "Fields" => "SessionID,Status,Player,Lang,PC,IP,Proxy,Connect,Login,LastAction,PacketsIn,PacketsOut"
    );
    return Poker_API($params);
}


// Получение IP
function get_user_ip(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $params = array(
        "Command" => "ConnectionsList",
        "Fields" => "SessionID,Player,PC,IP"
    );
    return Poker_API($params);
}


// TotalRake
function total_rake(WP_REST_Request $request)
{

    global $wpdb;
    $parameters = $request->get_query_params();

    $totalra = $parameters['totalrake'];
    $ttr = $wpdb->get_col("SELECT totalrake FROM  wp_totalrake");


    if ((float)$ttr[0] < (float)$totalra) {

        $wpdb->replace('wp_totalrake', array('id' => 1, 'totalrake' => (float)$totalra));
        $ttr2 = $wpdb->get_col("SELECT totalrake FROM  wp_totalrake");
        $newcls = new stdClass();
        $newcls->totalrake = round((float)$ttr2[0], 2);
        $newcls->result = 'Ok';


        return $newcls;
    }


    $newcls = new stdClass();
    $newcls->result = 'Error';


    return $newcls;
}


//LOGOUT
function logout_player_func(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    $player = $parameters['player'];


    $params = array("Command" => "AccountsGet", "Player" => $player);
    $api = Poker_API($params);
    $s = $api->SessionID;
    $p = array("Command" => "ConnectionsTerminate", "SessionID" => $s);


    return Poker_API($p);
}


// add_action('wp_logout', function () {
//     $current_user = wp_get_current_user();
//     $logi = $current_user->user_login;
//     $parametr = array("Command" => "AccountsList", "Fields" => "Player");
//     $api = Poker_API($parametr);
//     $players = $api->Player;
//     foreach ($players as $player) {
//         if ($player == $logi) {
//             $params = array("Command" => "AccountsGet", "Player" => $player);
//             $api = Poker_API($params);
//             $s = $api->SessionID;
//             $p = array("Command" => "ConnectionsTerminate", "SessionID" => $s);
//             Poker_API($p);
//             //clean_user_cache($current_user->ID);
//         }
//     }

// });

// add_shortcode('logout', function () {
//     echo wp_loginout();
// });


function balance_transfer(WP_REST_Request $request)
{
    $parameters = $request->get_query_params();
    if (isset($parameters['amount'])) {
        global $wpdb;
        date_default_timezone_set('Europe/Athens');
        $today = date("Y-m-d H:i:s");

        $player = $parameters['iam'];
        $num = $parameters['amount'];
        $play = $parameters['username'];

        $params3 = array("Command" => "AccountsGet", "Player" => $player);
        $api3 = Poker_API($params3);
        $ga = $api3->Balance;
        if ($ga < 0) {
            $num = 0;
            $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
            $api = Poker_API($params1);
            if ($api->Result === "Ok") ;
            $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
            $api = Poker_API($params2);


            $wpdb->replace(
                'wp_transiction',
                array('user1' => $player, 'user2' => $play, 'amount' => $num, 'date' => $today),
                array('%s', '%s', '%f', '%s')
            );
            return 'Ok';
        }
        if ($ga >= 0) {
            $params1 = array("Command" => "AccountsDecBalance", "Player" => $player, "Amount" => $num);
            $api = Poker_API($params1);
            if ($api->Result === "Ok") ;
            $params2 = array("Command" => "AccountsIncBalance", "Player" => $play, "Amount" => $num);
            $api = Poker_API($params2);
            if ($api->Result === "Ok") ;


            $wpdb->replace(
                'wp_transiction',
                array('user1' => $player, 'user2' => $play, 'amount' => $num, 'date' => $today),
                array('%s', '%s', '%f', '%s')
            );
            return 'Ok';
        }
    }
}

;


// Получение рейка за весь период
function get_rake_all_date()
{

    global $wpdb;
    $r = [];
    $da = $wpdb->get_col("SELECT date FROM  wp_rake");
    $us = $wpdb->get_col("SELECT user FROM  wp_rake");
    $rake = $wpdb->get_col("SELECT rake FROM  wp_rake");
    $id = $wpdb->get_col("SELECT id FROM  wp_rake");


    for ($i = 0; $i < count($rake); $i++) {
        $newcls[$i] = new stdClass();
        $newcls[$i]->data = $da[$i];
        $newcls[$i]->user = $us[$i];
        $newcls[$i]->rake = $rake[$i];
        $newcls[$i]->id = $id[$i];
        $r[] = $newcls[$i];
    };
    return $r;


}

;


// Смена пароля
function password_replace(WP_REST_Request $request)
{


    $parameters = $request->get_query_params();
    $user = get_user_by('login', $parameters['name']);
    wp_set_password($parameters['password'], $user->ID);
    $today = date("Y-m-d H:i");
    $params = array(
        "Command" => "AccountsEdit",
        "Player" => $parameters['name'],
        "PW" =>  $user->user_pass,
        "LastReset" => $today,
        "LastReset2" => $today,
        "Chat" => $today,

    );
    return Poker_API($params);


}

;







