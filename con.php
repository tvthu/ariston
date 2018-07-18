<?php

//header( "Content-Type: application/json, charset=utf-8" );

function stripUnicode($str){
    if(!$str) return false;
    $unicode = array(
        'a'=>'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
        'd'=>'đ',
        'e'=>'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
        'i'=>'í|ì|ỉ|ĩ|ị',
        'o'=>'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
        'u'=>'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
        'y'=>'ý|ỳ|ỷ|ỹ|ỵ',
    );
    foreach($unicode as $nonUnicode=>$uni) $str = preg_replace("/($uni)/i",$nonUnicode,$str);
    return $str;
}

$dataFolder = realpath(dirname(__FILE__));
$file = $dataFolder . '/assets/csv/' . 'Workbook1.csv';


$row = 0;

$indexs_lines;

$result = array();

if (($handle = fopen($file, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 20000, ",")) !== FALSE) {
        if ($row == 0){
            $indexs_lines = $data;
            array_push($indexs_lines, 'TV');
        }else{
            $array_value = $data;

            array_push($array_value, stripUnicode(strtolower($array_value[2])));

            $trimmed_array=array_map('trim',$array_value);

            $result[] = array_combine($indexs_lines, $trimmed_array);
        }

        $row++;
        $num = count($data);
    }
    fclose($handle);
}

$compress = array(
    'RECORDS' => array(
        $result
    )
);

$json = json_encode($compress, JSON_UNESCAPED_UNICODE);

if (file_put_contents('myfile.json', $json)){
    echo 'File saved!';
}else{
    echo 'die!';
}


//
//$csv = file_get_contents($file);
//$csvLines = explode("\n", $csv);
//
//$indexes = str_getcsv(array_shift($csvLines));
//array_push($indexes, 'TV');
//
//$array = array_map(function ($e) use ($indexes) {
//    $array_value = str_getcsv($e);
//    array_push($array_value, stripUnicode(strtolower($array_value[2])));
//
//    $trimmed_array=array_map('trim',$array_value);
//
//    return array_combine($indexes, $trimmed_array);
//}, $csvLines);
//
//
//$compress = array(
//    'RECORDS' => array(
//        $array
//    )
//);
//
//$json = json_encode($compress, JSON_UNESCAPED_UNICODE);
//
//file_put_contents('myfile.json', $json);
//
//echo 'File saved!';

?>
