<?php
/**
 * Приём заявок с лендинга «Розетка-таймер тижнева 16А / 3680W».
 * Заглушка: валидирует поля, пишет в orders.log, показывает «Дякуємо».
 * TODO: настроить отправку заявок в Telegram / Email / CRM.
 */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$name  = trim($_POST['name']  ?? '');
$phone = trim($_POST['phone'] ?? '');

if ($name === '' || $phone === '') {
    http_response_code(400);
    exit('Заповніть усі поля');
}

// Простая защита от мусора: минимум 10 символов в телефоне
if (strlen(preg_replace('/\D/', '', $phone)) < 10) {
    http_response_code(400);
    exit('Невірний номер телефону');
}

$ip   = $_SERVER['REMOTE_ADDR'] ?? '';
$date = date('Y-m-d H:i:s');

// Временное логирование (потом заменишь на отправку в Telegram/CRM)
$log = "{$date} | Ім'я: {$name} | Телефон: {$phone} | IP: {$ip}\n";
@file_put_contents(__DIR__ . '/orders.log', $log, FILE_APPEND | LOCK_EX);

// ===== TODO: отправка заявки =====
// Пример для Telegram (раскомментируешь и подставишь свои данные):
//
// $token   = 'ТВОЙ_BOT_TOKEN';
// $chat_id = 'ТВОЙ_CHAT_ID';
// $text    = "🔔 Нова заявка з лендингу\n\n"
//          . "Товар: Розетка-таймер 16А / 3680W\n"
//          . "Ціна: 518 грн\n"
//          . "Ім'я: {$name}\n"
//          . "Телефон: {$phone}\n"
//          . "IP: {$ip}\n"
//          . "Час: {$date}";
// @file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?" . http_build_query([
//     'chat_id'    => $chat_id,
//     'text'       => $text,
//     'parse_mode' => 'HTML',
// ]));
// =================================

// Показываем страницу «Дякуємо»
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Дякуємо за замовлення!</title>
    <style>
        body {
            font-family: -apple-system, Arial, sans-serif;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }
        .box {
            background: #fff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 480px;
            width: 100%;
        }
        h1 {
            color: #0e46ff;
            margin: 0 0 15px;
            font-size: 26px;
        }
        p {
            color: #333;
            font-size: 18px;
            line-height: 1.5;
            margin: 0 0 15px;
        }
        a {
            display: inline-block;
            margin-top: 10px;
            padding: 14px 32px;
            background: #ee3737;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
        }
        a:hover { background: #d42f2f; }
    </style>
</head>
<body>
    <div class="box">
        <h1>Дякуємо!</h1>
        <p>Ваше замовлення прийнято. Наш менеджер зв'яжеться з вами найближчим часом для підтвердження.</p>
        <p style="font-size:15px;color:#777;">Розетка-таймер тижнева 16А / 3680W — 518 грн</p>
        <a href="/">Повернутися на сайт</a>
    </div>
</body>
</html>