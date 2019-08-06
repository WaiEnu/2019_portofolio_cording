<!doctype html>
<html>
<head>
 <meta charset="utf-8">
 <title>index</title>
 <link rel="stylesheet" type="text/css" href="css/style.css" />


<?php
function getFiles($target) {

  $list = array();

  foreach(glob('dir/{*.gif,*.zip,*.pdf}',GLOB_BRACE) as $file){
    $list[] = $file;
  }

  return $list;
}
?>
</head>
<body>

<div class="wrap">

<?php include ($_SERVER['DOCUMENT_ROOT'] . '/common/include/header.html'); ?>

<?php include ($_SERVER['DOCUMENT_ROOT'] . '/common/include/sidebar.html'); ?>
<main>
<h1>blog</h1>
<div class="main_cnt">
<?php

define("ARTICLE_MAX_NUM","3");
define("FIRST_VISIT_PAGE","1");
$dir = 'blog';
$article_file=getFiles($dir);
$article_num = count($article_file);
$num_max=ARTICLE_MAX_NUM;
$max_page = ceil($article_num / ARTICLE_MAX_NUM);

if(!isset($_GET['page'])){
    $now_page = FIRST_VISIT_PAGE;
}else if(preg_match("/^[1-9][0-9]*$/",$_GET['page'])){
    $now_page = htmlspecialchars($_GET['page'],ENT_QUOTES,'UTF-8');
}else{
    echo "pageが正しく設定されていなかったので".FIRST_VISIT_PAGE."に設定しました!<br>";
    $now_page = FIRST_VISIT_PAGE;
}


$start = ($now_page - 1) * ARTICLE_MAX_NUM;
$output = array_slice($article_file,$start,ARTICLE_MAX_NUM);
if(empty($output)){
    echo "記事はありません<br>";
}else{
    foreach($output as $val){
        $path = '/' . $val;
        include ($_SERVER['DOCUMENT_ROOT'] . $path);
    }
}

?>

</div>

<?php echo '<p>|' . $now_page . '|</p>';?>

<?php
if($now_page > 1){
  echo '<a href=\'index.php?page='.($now_page-1).'\')><-prev </a>';
}
  echo '<a href=\'index.php\')>| TOP |</a>';
if($now_page < $max_page){
  echo '<a href=\'index.php?page='.($now_page+1).'\')> next-></a>';
}
?>

</main>

<?php include ($_SERVER['DOCUMENT_ROOT'] . '/common/include/footer.html'); ?>
</div>

</body>
</html>