
<?php
function downloadJs($file_url, $save_to)
{
    $content = file_get_contents($file_url);
    file_put_contents($save_to, $content);
}
// Указываем URL, затем папку от корня сайта и имя файла с расширением.
// Проверьте чтобы на папке были права на запись 777/755
// Метрика
downloadJs('https://mc.yandex.ru/metrika/watch.js', realpath("./js") . '/watch.js');

?>



// mc.yandex.ru/metrika/watch.js ->  ad.lekua.in.ua/dj7/js/watch.js

// wget -q -O - /dev/null http://ad.lekua.in.ua/dj7/downloadjs.php >/dev/null 2>&1