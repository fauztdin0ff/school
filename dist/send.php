<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
   echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
   exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['telephone'] ?? '');

if (!$name || !$email || !$phone) {
   echo json_encode(['status' => 'error', 'message' => 'Empty fields']);
   exit;
}

$mail = new PHPMailer(true);

try {

   // SMTP настройки Spaceweb
   $mail->isSMTP();
   $mail->Host = 'smtp.spaceweb.ru';
   $mail->SMTPAuth = true;
   $mail->Username = 'admin@languageschool-nv.ru';
   $mail->Password = 'ВАШ_ПАРОЛЬ_ОТ_ПОЧТЫ';
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
   $mail->Port = 465;

   $mail->CharSet = 'UTF-8';

   // отправитель
   $mail->setFrom('admin@languageschool-nv.ru', 'Language School');
   // получатели
   $mail->addAddress('sergey-nv@mail.ru');
   $mail->addAddress('teachers20_21@mail.ru');

   // контент
   $mail->isHTML(true);
   $mail->Subject = 'Новая заявка с сайта';

   $mail->Body = "
      <h3>Новая заявка</h3>
      <p><b>Имя:</b> {$name}</p>
      <p><b>Email:</b> {$email}</p>
      <p><b>Телефон:</b> {$phone}</p>
   ";

   $mail->send();

   echo json_encode(['status' => 'success']);

} catch (Exception $e) {
   echo json_encode([
      'status' => 'error',
      'message' => $mail->ErrorInfo
   ]);
}