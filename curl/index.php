<?php
/**
 * Created by PhpStorm.
 * User: liwei
 * Date: 2018/8/23
 * Time: 9:53 AM
 */

function defaultIphoneHeader() {
    $header[] = "User-Agent: 5.0 (iPhone; U; CPU iPhone OS 4_3 like Mac OS X; en-us) "
        . "AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16";
    $header[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    $header[] = "Accept-Charset: GB2312,utf-8;q=0.7,*;q=0.7";
    $header[] = "Accept-Encoding: gzip,deflate";

    return $header;
}

function defaultHeader() {
    $header[] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8";
    $header[] = "accept-encoding: gzip, deflate, br";
    $header[] = "accept-language: zh,en;q=0.9,ar;q=0.8,zh-CN;q=0.7,ja;q=0.6,zh-TW;q=0.5";
    $header[] = "upgrade-insecure-requests: 1";
    $header[] = "User-Agent: Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

    return $header;
}



function BypassCloudFlare($url) {
    //$data = OpenURLCloudFlare('http://localhost/demo/curl/test.html');
    $data = OpenURLCloudFlare($url);
    if($data) {
        preg_match('/name="jschl_vc"\s+value="(.+)"/Ui', $data, $jschl_vc);
        preg_match('/name="pass"\s+value="(.+)"/Ui', $data, $pass);
        if(preg_match('|var s,t,o,p,b,r,e,a,k,i,n,g,f,([^;]+)|',$data,$matches)){
            $param1=trim($matches[1]).';';
        }


        if(preg_match('|(;\w+\.\w+[\-\+]=.*.)\';|',$data,$matches)){

            $param2 = $matches[1];
            $param2 = str_replace('a.value', 'var value',$param2);
        }
        $jschl_answer = '';
        if($param1 && $param2){
            $jschl_answer =  CalJSData($param1,$param2);
        }
        $jschl_answer = str_replace("'","",$jschl_answer);
        $url2  = parse_url($url, PHP_URL_SCHEME).'://'.parse_url($url, PHP_URL_HOST);
        $url2 .= '/cdn-cgi/l/chk_jschl?';
        $url2 .= 'jschl_vc='.$jschl_vc[1];
        $url2 .= '&pass='.$pass[1];
        $url2 .= '&jschl_answer='.$jschl_answer;
        echo $url2;
        echo "\n";
        sleep(5);
        $data = OpenURLCloudFlare($url2, $url);
    } else {
        return 'error';
    }
    var_dump($data);
    exit;
}

function OpenURLCloudFlare($url, $referer='') {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, defaultHeader());
    if($referer)
        curl_setopt($ch, CURLOPT_REFERER, $referer);
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
    curl_setopt($ch, CURLOPT_COOKIEJAR, getcwd().'albawabhnewscookie.txt');
    curl_setopt($ch, CURLOPT_COOKIEFILE, getcwd().'albawabhnewscookie.txt');
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    echo($httpCode);
    echo "\n";
    curl_close($ch);
    return $data;
}



function CalJSData($p1, $p2) {

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_PORT => "9091",
        CURLOPT_URL => "http://127.0.0.1:9091/api/cdntool/decode",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "param1=".urlencode($p1)."&param2=".urlencode($p2)."&host=www.albawabhnews.com",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache",
            "content-type: application/x-www-form-urlencoded",
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return  $response;
    }


}

$url  = urldecode($_GET['url']);
BypassCloudFlare($url);