<?php

require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');

$width = $_POST['width'];
$height = $_POST['height'];
$type = $_POST['type'];
$svg = $_POST['svg'];

// create new PDF document
$pdf = new TCPDF('Landscape', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Loiane Groner');
$pdf->SetTitle('Export Chart');
$pdf->SetSubject('Mastering Ext JS Book');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------
// add a page
$pdf->AddPage();

$pdf->ImageSVG($file='@'.$svg, $x=10, $y=10, $w=$width, $h=$height, $link='', $align='T', $palign='C', $border=0, $fitonpage=true);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('chart.pdf', 'D');

//============================================================+
// END OF FILE
//============================================================+
