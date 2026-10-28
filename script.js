"use strict";

/* ==========================================
   M~A~MARAL — MAIN APPLICATION
========================================== */

const STORAGE_KEYS = {
  favorites: "maral_favorites_v1",
  theme: "maral_theme_v1"
};

const state = {
  category: "all",
  language: "all",
  search: "",
  visibleCount: 9
};

/*
  Every quote contains:
  id       = unique identifier
  category = love / sad / life / motivation
  original = quote in its original language
  kurdish  = Kurdish translation
*/

const quotesDatabase = {

  korean: [
    {id:"k1",category:"love",original:"너는 나의 가장 아름다운 우연이야.",kurdish:"تۆ جوانترین ڕووداوی نەچاوەڕوانکراوی ژیانمی."},
    {id:"k2",category:"love",original:"내 마음은 언제나 너에게 가.",kurdish:"دڵم هەمیشە ڕوو لە تۆ دەکات."},
    {id:"k3",category:"love",original:"너와 함께라면 평범한 하루도 특별해.",kurdish:"لەگەڵ تۆدا تەنانەت ڕۆژێکی ئاساییش تایبەتە."},
    {id:"k4",category:"love",original:"너의 미소는 나의 작은 우주야.",kurdish:"پێکەنینەکەت جیهانێکی بچووکی منە."},
    {id:"k5",category:"love",original:"사랑은 너의 이름을 생각하는 순간이야.",kurdish:"خۆشەویستی ئەو ساتەیە کە ناوت دێتە بیرم."},
    {id:"k6",category:"love",original:"내 하루의 가장 좋은 부분은 너야.",kurdish:"جوانترین بەشی ڕۆژەکەم تۆیت."},
    {id:"k7",category:"love",original:"너는 내 마음의 따뜻한 집이야.",kurdish:"تۆ ماڵی گەرمی دڵمی."},
    {id:"k8",category:"love",original:"멀리 있어도 마음은 가까워.",kurdish:"هەرچەندە دوور بیت، دڵەکان نزیکن."},
    {id:"k9",category:"love",original:"너와 나, 우리만의 이야기가 있어.",kurdish:"من و تۆ چیرۆکی تایبەت بە خۆمانمان هەیە."},
    {id:"k10",category:"love",original:"너의 행복이 나의 기쁨이야.",kurdish:"خۆشیی تۆ شادیی منە."},
    {id:"k11",category:"sad",original:"웃고 있어도 마음은 가끔 울어.",kurdish:"تەنانەت کاتێک پێدەکەنم، دڵم هەندێک جار دەگریێت."},
    {id:"k12",category:"sad",original:"그리움은 조용히 마음에 남아.",kurdish:"دڵتەنگی بە بێدەنگی لە دڵدا دەمێنێتەوە."},
    {id:"k13",category:"sad",original:"어떤 말은 너무 늦게 도착해.",kurdish:"هەندێک قسە زۆر درەنگ دەگەن."},
    {id:"k14",category:"sad",original:"가까이 있어도 멀게 느껴질 때가 있어.",kurdish:"هەندێک جار کەسێک نزیکە، بەڵام دوور هەست پێدەکرێت."},
    {id:"k15",category:"sad",original:"기억은 사라지지 않고 조용히 머물러.",kurdish:"بیرەوەرییەکان نامرن؛ بە بێدەنگی دەمێننەوە."},
    {id:"k16",category:"sad",original:"마음에도 쉬는 시간이 필요해.",kurdish:"دڵیش پێویستی بە کاتی پشوودانە."},
    {id:"k17",category:"life",original:"작은 순간들이 인생을 아름답게 만들어.",kurdish:"ساتە بچووکەکان ژیان جوان دەکەن."},
    {id:"k18",category:"life",original:"모든 계절은 지나가고 새로운 날이 와.",kurdish:"هەموو وەرزێک تێدەپەڕێت و ڕۆژێکی نوێ دێت."},
    {id:"k19",category:"life",original:"천천히 가도 괜찮아.",kurdish:"ئەگەر بە هێواشی بچیت، هیچ کێشەیەک نییە."},
    {id:"k20",category:"life",original:"오늘의 작은 행복을 놓치지 마.",kurdish:"خۆشییە بچووکەکانی ئەمڕۆ لەدەست مەدە."},
    {id:"k21",category:"motivation",original:"너의 속도로 빛나면 돼.",kurdish:"بە خێرایی خۆت بدرەوشێوە."},
    {id:"k22",category:"motivation",original:"실수는 성장의 일부야.",kurdish:"هەڵەکردن بەشێکە لە گەشەکردن."},
    {id:"k23",category:"motivation",original:"작은 시작도 큰 변화를 만들 수 있어.",kurdish:"دەستپێکردنی بچووکیش دەتوانێت گۆڕانکاریی گەورە دروست بکات."},
    {id:"k24",category:"motivation",original:"너 자신을 믿어 봐.",kurdish:"هەوڵ بدە باوەڕ بە خۆت بکەیت."},
    {id:"k25",category:"motivation",original:"네 이야기는 아직 끝나지 않았어.",kurdish:"چیرۆکی تۆ هێشتا کۆتایی نەهاتووە."},
    {id:"k26",category: "motivation", original: "시작이 반이다.", kurdish: "دەستپێک نیوەی کارەکەیە."},
    {id:"k27",category: "life", original: "고생 끝에 낙이 온다.", kurdish: "لەدوای سەختی و ماندووبوون، خۆشی دێت."},
    {id:"k28",category: "love", original: "너는 내 인생의 가장 예쁜 꽃이야.", kurdish: "تۆ جوانترین گوڵی ژیانمی."},
    {id:"k29",category: "sad", original: "비가 오면 마음도 젖어든다.", kurdish: "کاتێک باران دەبارێت، دڵیش تەڕ دەبێت."},{id: "k105", category: "motivation", original: "실수는 성공의 어머니이다.", kurdish: "شکست و هەڵە دایکی سەرکەوتنە."},
    {id:"k30",category: "life", original: "시간은 금이다.", kurdish: "کات زێڕە."},
    {id:"k31",category: "love", original: "너를 사랑해.", kurdish: "خۆشم دەوێیت."},
    {id:"k32",category: "sad", original: "마음이 아프다.", kurdish: "دڵم ئازاری هەیە (دڵشکام)."},
    {id:"k33",category: "motivation", original: "포기하지 마세요.", kurdish: "کۆڵ مەدە."},
    {id:"k34",category: "life", original: "인생은 짧고 예술은 길다.", kurdish: "ژیان کورتع و هونەر درێژە."},
    {id:"k35",category: "love", original: "내 곁에 있어 줘서 고마워.", kurdish: "سوپاس کە لە تەنیشتمیدا."},
    {id:"k36",category: "sad", original: "눈물이 난다.", kurdish: "فرمێسک لە چاوەکانم دێتە خوارەوە."},
    {id:"k37",category: "motivation", original: "할 수 있다!", kurdish: "دەتوانیت بکەیت!"},
    {id:"k38",category: "life", original: "오늘 최선을 다하자.", kurdish: "با ئەمڕۆ هەموو توانای خۆمان بخەینە گەڕ."},
    {id:"k39",category: "love", original: "너는 내 전부야.", kurdish: "تۆ هەموو شتێکی منی."},
    {id:"k40",category: "sad", original: "외로움을 느낀다.", kurdish: "هەست بە تەنهایی دەکەم."},
    {id:"k41",category: "motivation", original: "꿈을 향해 달려가라.", kurdish: "بەرەو ئاراستەی خەونەکانت ڕاکە."},
    {id:"k42",category: "life", original: "웃음이 복이 온다.", kurdish: "پێکەنین بەخت دەهێنێت."},
    {id:"k43",category: "love", original: "너는 나의 빛이야.", kurdish: "تۆ ڕووناکی منی."},
    {id:"k44",category: "sad", original: "그리운 사람이 있다.", kurdish: "کەسێک هەەیە کە بیری دەکەم."},
    {id:"k45",category: "motivation", original: "노력은 배신하지 않는다.", kurdish: "هەوڵدان خیانەت ناکات."},
    {id:"k46",category: "life", original: "이 또한 지나가리라.", kurdish: "ئەمەش تێپەڕ دەبێت."},
    {id:"k47",category: "love", original: "영원히 함께하자.", kurdish: "با هەمیشە پێکەوە بوین."},
    {id:"k48",category: "sad", original: "지친 하루였다.", kurdish: "ڕۆژێکی ماندووکەر بوو."},
    {id:"k49",category: "motivation", original: "내일은 더 좋을 거야.", kurdish: "سبەینێ زۆر باشتر دەبێت."},
    {id:"k50",category: "life", original: "작은 일들이 큰 기억이 된다.", kurdish: "شتە بچووکەکان دەبنە بیرەوەری گەورەکان."},
  {id: "e151", category: "motivation", original: "시작이 반이다.", kurdish: "دەستپێکردن نیوەی کارەکەیە."},
  {id: "e152", category: "success", original: "실패는 성공의 어머니.", kurdish: "شکست دایکی سەرکەوتنە."},
  {id: "e153", category: "life", original: "고생 끝에 낙이 온다.", kurdish: "لە دوای ناڕەحەتی خۆشی دێت."},
  {id: "e154", category: "mindset", original: "뜻이 있는 곳에 길이 있다.", kurdish: "لەو شوێنەی کە ئیرادە هەبێت، ڕێگەیەکیش هەیە."},
  {id: "e155", category: "dreams", original: "꿈을 지니고 있으면, 무엇이든 이룰 수 있다.", kurdish: "ئگەر خەونت هەبێت، دەتوانیت هەر شتێک بەدەست بهێنیت."},
  {id: "e156", category: "action", original: "행동이 말보다 중요하다.", kurdish: "کردەوە لە قسە گرنگترە."},
  {id: "e157", category: "happiness", original: "웃음은 가장 훌륭한 명약이다.", kurdish: "پێکەنین باشترین دەرمانە."},
  {id: "e158", category: "perseverance", original: "포기하지 마라, 거의 다 왔다.", kurdish: "کۆڵ مەدە، نزیک بوویتەتەوە."},
  {id: "e159", category: "growth", original: "오늘 하루도 최선을 다하자.", kurdish: "با لەم ڕۆژەشدا باشترین هەوڵی خۆمان بدەین."},
  {id: "e160", category: "strength", original: "비 온 뒤에 땅이 굳어진다.", kurdish: "لە دوای باران بارین زەوی ڕەقتر دەبێت (ناخۆشییەکان بەهێزترت دەکەن)."},
  {id: "e161", category: "wisdom", original: "아는 길도 물어서 가라.", kurdish: "تەنانەت لە ڕێگاکەش کە دەیعەیت پرسیار بکە."},
  {id: "e162", category: "motivation", original: "내일은 내일의 태양이 뜬다.", kurdish: "سبەی خۆری سبەینێ هەڵدێت."},
  {id: "e163", category: "positivity", original: "긍정적인 생각이 성공을 만든다.", kurdish: "بیری ئەرێنی سەرکەوتن دروست دەکات."},
  {id: "e164", category: "life", original: "인생은 짧고 예술은 길다.", kurdish: "ژیان کورتە و هونەر درێژە."},
  {id: "e165", category: "success", original: "노력은 배신하지 않는다.", kurdish: "ماندووبوون خیانەت ناکات."},
  {id: "e166", category: "courage", original: "용기 있는 자가 미인을 얻는다.", kurdish: "کەسی بوێر شتە جوانەکان بەدەست دێنێت."},
  {id: "e167", category: "action", original: "지금 하지 않으면 언제 하겠는가?", kurdish: "ئگەر ئێستا نەیەکەیت، کە دەبێت بیکەیت؟"},
  {id: "e168", category: "patience", original: "참을 인(忍) 자 세 번이면 살인도 면한다.", kurdish: "سێ جار ئارامگرتن لە هەموو ناخۆشییەک ڕزگارت دەکات."},
  {id: "e169", category: "hope", original: "희망은 닻과 같다.", kurdish: "هیوا وەکو لەنگەرە (ڕاگرە)."},
  {id: "e170", category: "love", original: "사랑은 눈이 멀게 한다.", kurdish: "خۆشەویستی کوێرە دەکات."},
  {id: "e171", category: "motivation", original: "할 수 있다고 믿으면 이룰 수 있다.", kurdish: "ئەگەر باوەڕت هەبێت کە دەتوانیت، ئەوا دەیبیتە ڕاستی."},
  {id: "e172", category: "success", original: "작은 실천이 큰 성공을 만든다.", kurdish: "کردەوە بچووکەکان سەرکەوتنی گەورە دروست دەکەن."},
  {id: "e173", category: "mindset", original: "생각을 바꾸면 미래가 바뀐다.", kurdish: "بیرکردنەوەکانت بگۆڕە تا داهاتووت بگۆڕێت."},
  {id: "e174", category: "life", original: "시간은 금이다.", kurdish: "کات زێڕە."},
  {id: "e175", category: "happiness", original: "행복은 자기가 만드는 것이다.", kurdish: "دڵخۆشی شتێکە کە خۆت دروستی دەکەیت."},
  {id: "e176", category: "wisdom", original: "배에는 지혜가 실려야 한다.", kurdish: "مێشک دەبێت پڕ بێت لە حیکمەت."},
  {id: "e177", category: "growth", original: "매일 조금씩 발전하자.", kurdish: "با هەموو ڕۆژێک کەمێک پێشکەوتن بەدەست بهێنین."},
  {id: "e178", category: "perseverance", original: "백지장도 맞들면 낫다.", kurdish: "کاری بە کۆمەڵ کارەکان ئاسانتر دەکات."},
  {id: "e179", category: "dreams", original: "꿈을 향해 달려가라.", kurdish: "بەرەو لای خەونەکانت ڕابکە."},
  {id: "e180", category: "strength", original: "모든 것은 마음먹기 달렸다.", kurdish: "هەموو شتێک بە مێشک و دەروون دەبەسترێتەوە."},
  {id: "e181", category: "motivation", original: "최선을 다했다면 후회하지 마라.", kurdish: "ئەگەر باشترین هەوڵی خۆت داوە، پەشیمان مەبە."},
  {id: "e182", category: "success", original: "실패를 두려워하지 말라.", kurdish: "لە شکست مەترسە."},
  {id: "e183", category: "life", original: "인생은 롤러코스터와 같다.", kurdish: "ژیان وەکو یاری مۆتۆڕە (بەرز و نزمەی زۆرە)."},
  {id: "e184", category: "mindset", original: "할 수 있다! 하면 된다!", kurdish: "دەتوانیت! دەکرێت و دەبێت!"},
  {id: "e185", category: "action", original: "말보다 행동으로 보여줘라.", kurdish: "بە کردار نیشانم بدە نەک بە قسە."},
  {id: "e186", category: "patience", original: "급할수록 돌아가라.", kurdish: "چەندە پەلەت بێت، هێواشتر بڕۆ."},
  {id: "e187", category: "hope", original: "어둠이 깊을수록 새벽이 가깝다.", kurdish: "چەندە تاریکی قووڵتر بێت، بەیانی نزیکترە."},
  {id: "e188", category: "love", original: "사랑은 주는 것이다.", kurdish: "خۆشەویستی بەخشینە."},
  {id: "e189", category: "wisdom", original: "세 살 버릇 여든까지 간다.", kurdish: "ئەوەی لە منداڵیدا فێر دەبیت تا پیری لەگەڵت دەبێت."},
  {id: "e190", category: "growth", original: "배움에는 끝이 없다.", kurdish: "فێربوون کۆتایی نییە."},
  {id: "e191", category: "motivation", original: "네 자신을 믿어라.", kurdish: "باوەڕت بە خۆت هەبێت."},
  {id: "e192", category: "success", original: "준비된 자에게 기회가 온다.", kurdish: "دەرفەت بۆ کەسێک دێت کە ئامادەکار بێت."},
  {id: "e193", category: "courage", original: "두려움을 극복하라.", kurdish: "بەسەر ترسەکانتدا سەرکەوە."},
  {id: "e194", category: "happiness", original: "작은 것에 감사하자.", kurdish: "سوپاسگوزار بە بۆ شتە بچووکەکان."},
  {id: "e195", category: "perseverance", original: "끝까지 버티는 사람이 이긴다.", kurdish: "ئەوەی تا کۆتایی بمێنێتەوە براوەیە."},
  {id: "e196", category: "dreams", original: "상상하면 현실이 된다.", kurdish: "ئەگەر خەیاڵی بکەیت، دەبێتە ڕاستی."},
  {id: "e197", category: "strength", original: "시련은 나를 더 강하게 만든다.", kurdish: "ناخۆشییەکان من بەهێزتر دەکەن."},
  {id: "e198", category: "life", original: "오늘이 내 인생의 가장 젊은 날이다.", kurdish: "ئەمڕۆ گەنجترین ڕۆژی ژیانمە."},
  {id: "e199", category: "wisdom", original: "시작이 반이다, 하지만 끝을 보는 것이 중요하다.", kurdish: "دەستپێکردن نیوەیە، بەڵام گەیشتن بە کۆتایی گرنگترینە."},
  {id: "e200", category: "motivation", original: "멈추지 않는 한 늦지 않는다.", kurdish: "تاکو نەوەستیت، هیچ کات دواکەوتوو نییە."},
  {id: "e201", category: "success", original: "성공은 노력의 대가이다.", kurdish: "سەرکەوتن پاداشتی ماندووبوونە."},
  {id: "e202", category: "mindset", original: "긍정의 힘을 믿어라.", kurdish: "باوەڕت بە هێزی ئەرێنی هەبێت."},
  {id: "e203", category: "life", original: "인생은 아름다워.", kurdish: "ژیان جوانە."},
  {id: "e204", category: "happiness", original: "웃음꽃이 피어나길.", kurdish: "با باخچەی پێکەنینت ببووژێتەوە."},
  {id: "e205", category: "growth", original: "어제보다 나은 오늘을 살자.", kurdish: "ئەمڕۆیەک بژی کە لە دوێنێ باشتر بێت."},
  {id: "e206", category: "action", original: "고민만 하지 말고 실행하라.", kurdish: "تەنها بیری لێ مەکرەوە، بەڵکو جێبەجێی بکە."},
  {id: "e207", category: "dreams", original: "꿈은 이루어진다.", kurdish: "خەونەکان دێنەدی."},
  {id: "e208", category: "patience", original: "인내는 쓰지만 그 열매는 달다.", kurdish: "ئارامگرتن تاڵە، بەڵام بەرەکەی شیرینە."},
  {id: "e209", category: "wisdom", original: "지혜는 보물보다 소중하다.", kurdish: "حیکمەت لە گەنجینە بەنرخترە."},
  {id: "e210", category: "love", original: "사랑은 모든 것을 이긴다.", kurdish: "خۆشەویستی بەسەر هەموو شتێکدا سەرکەوتوو دەبێت."},
  {id: "e211", category: "motivation", original: "스스로를 의심하지 마라.", kurdish: "گومانت لە خۆت نەبێت."},
  {id: "e212", category: "success", original: "노력은 절대 배신하지 않는다.", kurdish: "ماندووبوون هەرگیز خیانەت ناکات."},
  {id: "e213", category: "courage", original: "담대하게 앞으로 나아가라.", kurdish: "بە بوێرییەوە بەرەو پێشەوە هەنگاو بنێ."},
  {id: "e214", category: "life", original: "삶은 기회다, 잡어라.", kurdish: "ژیان دەرفەتە، بیقۆزەوە."},
  {id: "e215", category: "happiness", original: "행복은 가까이에 있다.", kurdish: "دڵخۆشی لە نزیکتەوەیە."},
  {id: "e216", category: "perseverance", original: "뚝심 있게 밀고 나가라.", kurdish: "بە سەرسوڕهێنەرانە بەردەوام بە."},
  {id: "e217", category: "strength", original: "역경 속에서 피어나는 꽃이 가장 아름답다.", kurdish: "ئەو گوڵەی لە ناو ناخۆشیدا دەڕوێت جوانترینە."},
  {id: "e218", category: "mindset", original: "마음 먹기에 달렸어.", kurdish: "هەموو شتێک بە خواستی دڵت دەست پێدەکات."},
  {id: "e219", category: "dreams", original: "꿈을 크게 품어라.", kurdish: "خەونی گەورەت هەبێت."},
  {id: "e220", category: "wisdom", original: "시련은 성장의 발판이다.", kurdish: "شکست و ناخۆشی پلیسکانەن بۆ گەشەکردن."},
  {id: "e221", category: "motivation", original: "오늘 흘린 땀은 내일의 보석이다.", kurdish: "عەرەقەی ئەمڕۆ، مرواری داهاتووە."},
  {id: "e222", category: "success", original: "최고가 되기 위해 노력하라.", kurdish: "هەوڵ بدە باشترین بلیت."},
  {id: "e223", category: "life", original: "순간을 영원처럼 사랑하라.", kurdish: "ساتەکان خۆشویستن وەک ئەوەی هەمیشەیی ببن."},
  {id: "e224", category: "action", original: "망설이지 말고 도전하라.", kurdish: "دوو دڵ مەبە و دەستپێشخەری بکە."},
  {id: "e225", category: "happiness", original: "미소 짓는 하루를 보내세요.", kurdish: "ڕۆژێکی پڕ لە زەردەخەنە بۆ خۆت دروست بکە."},
  {id: "e226", category: "perseverance", original: "칠전팔기의 정신으로.", kurdish: "بە ڕۆحیەی حەوت جار کەوتن و هەشت جار هەستانەوە."},
  {id: "e227", category: "hope", original: "구름 뒤에는 언제나 태양이 빛난다.", kurdish: "لە پشت هەورەکانەوە هەمیشە خۆر دەدرەوشێتەوە."},
  {id: "e228", category: "love", original: "사랑은 숨길 수 없다.", kurdish: "خۆشەویستی ناششاردرێتەوە."},
  {id: "e229", category: "wisdom", original: "말은 조심해서 다뤄야 한다.", kurdish: "پێویستە وریا بی لە شێوازی قسەکردن."},
  {id: "e230", category: "growth", original: "매일 성장하는 내가 되자.", kurdish: "با ببم بە کەسێک کە هەموو ڕۆژێک گەشە دەکات."},
  {id: "e231", category: "motivation", original: "포기는 배추 썰 때나 쓰는 말이다.", kurdish: "کۆڵدۆن تەنها وشەیەکە بۆ کاتی لەتوپەتکردنی کەلەرم (واتە هەرگیز کۆڵ مەدە)."},
  {id: "e232", category: "success", original: "성공의 비결은 지속함에 있다.", kurdish: "نهێنی سەرکەوتن لە بەردەوامبووندایە."},
  {id: "e233", category: "courage", original: "두려움을 마주할 용기를 가져라.", kurdish: "بوێری ئەوەت هەبێت ڕووبەڕووی ترسەکانت بلیتەوە."},
  {id: "e234", category: "life", original: "인생은 마라톤이다.", kurdish: "ژیان ڕاکردنێکی درێژە (ماراسۆنە)."},
  {id: "e235", category: "happiness", original: "소소한 일상에서 행복을 찾자.", kurdish: "دڵخۆشی لە ژیانی ڕۆژانەی سادەدا بدۆزەوە."},
  {id: "e236", category: "mindset", original: "생각대로 된다.", kurdish: "وەکو ئەوە دەبێت کە بیری لێدەکەیتەوە."},
  {id: "e237", category: "strength", original: "다시 일어설 힘이 있다.", kurdish: "تۆ هێزت هەیە بۆ ئەوەی دووبارە هەستیتەوە."},
  {id: "e238", category: "dreams", original: "꿈꾸는 자만이 세상을 바꾼다.", kurdish: "تەنها ئەوانەی خەون دەبینن دەتوانن جیهان بگۆڕن."},
  {id: "e239", category: "wisdom", original: "지식보다 상상력이 중요하다.", kurdish: "خەیاڵ لە زانین گرنگترە."},
  {id: "e240", category: "motivation", original: "열정을 가지고 질주하라.", kurdish: "بە خرۆش و پەرۆشییەوە ڕابکە."},
  {id: "e241", category: "success", original: "땀방울은 거짓말을 하지 않는다.", kurdish: "دڵۆپەکانی عارەقە درۆ ناکەن."},
  {id: "e242", category: "life", original: "후회 없는 삶을 살아라.", kurdish: "ژیانێک بژی کە تێیدا پەشیمانی نەبێت."},
  {id: "e243", category: "action", original: "생각을 행동으로 옮겨라.", kurdish: "بیرۆکەکانت بگۆڕە بۆ کردار."},
  {id: "e244", category: "patience", original: "조금만 더 견뎌내자.", kurdish: "تەنها کەمێکی تر بەرگە بگرە."},
  {id: "e245", category: "happiness", original: "마음의 평화가 최고의 부유함이다.", kurdish: "ئارامی دەروون گەورەترین دەوڵەمەندییە."},
  {id: "e246", category: "perseverance", original: "끝까지 가봐야 안다.", kurdish: "تاکو نەگەیتە کۆتایی نازانیت."},
  {id: "e247", category: "hope", original: "내일은 오늘보다 더 나을 것이다.", kurdish: "سبەی لە ئەمڕۆ باشتر دەبێت."},
  {id: "e248", category: "love", original: "너와 함께라면 어디든 좋다.", kurdish: "لەگەڵ تۆدا، هەر شوێنێک بێت جوانە."},
  {id: "e249", category: "growth", original: "배움에는 나이가 없다.", kurdish: "فێربوون تەمەنی نییە."},
  {id: "e250", category: "motivation", original: "한계는 내가 정하는 것이다.", kurdish: "سنوورەکان ئەوانەن کە خۆت دایان دەنێیت."},
  {id: "e251", category: "success", original: "오늘의 노력이 내일의 영광이다.", kurdish: "ماندوبوونی ئەمڕۆ، شکۆی داهاتووە."},
  {id: "e252", category: "courage", original: "겁내지 말고 부딪혀라.", kurdish: "ترست نەبێت و خۆت لێوە بدە."},
  {id: "e253", category: "life", original: "인생은 캔버스와 같다, 네가 그려라.", kurdish: "ژیان وەک تابلۆیە، خۆت ڕەنگی بکە."},
  {id: "e254", category: "mindset", original: "긍정적인 마인드가 전부다.", kurdish: "عەقڵیەتی ئەرێنی هەموو شتێکە."},
  {id: "e255", category: "happiness", original: "지금 이 순간을 즐겨라.", kurdish: "چێژ لەم ساتە وەربگرە."},
  {id: "e256", category: "strength", original: "폭풍은 지나가기 마련이다.", kurdish: "تۆفانەکان هەمیشە تێدەپەڕن."},
  {id: "e257", category: "dreams", original: "꿈을 믿는 자에게 기적이 일어난다.", kurdish: "معجیزە ڕوەدات بۆ کەسێک کە باوەڕی بە خەونەکەی هەیە."},
  {id: "e258", category: "wisdom", original: "겸손은 최대의 미덕이다.", kurdish: "سادەیی و خۆبەخستنە خوارەوە گەورەترین سیفەتە."},
  {id: "e259", category: "action", original: "행동하지 않으면 아무것도 변하지 않는다.", kurdish: "تا هەنگاو نەنێیت هیچ شتێک نگۆڕێت."},
  {id: "e260", category: "motivation", original: "불가능이란 없다.", kurdish: "هیچ شتێک بە ناوی مەحاڵەوە بوونی نییە."},
  {id: "e261", category: "success", original: "성공을 향한 발걸음을 멈추지 마라.", kurdish: "هەنگاوەکانت بەرەو سەرکەوتن ڕەوەستێنە."},
  {id: "e262", category: "life", original: "모든 순간을 소중히 여겨라.", kurdish: "نرخ بۆ هەموو ساتێک دابنێ."},
  {id: "e263", category: "patience", original: "인내심은 모든 문을 연다.", kurdish: "ئارامگرتن هەموو دەرگاکان دەكاتەوە."},
  {id: "e264", category: "happiness", original: "웃음은 전염된다.", kurdish: "پێکەنین ڤایرۆسییە (تەقەببولی هەیە)."},
  {id: "e265", category: "growth", original: "더 높이 도약하기 위해 웅크린다.", kurdish: "بۆ ئەوەی بەرزتر باز بدەیت، سەرەتا خۆت کۆدەکەیتەوە."},
  {id: "e266", category: "hope", original: "빛은 어둠 속에서 더 밝다.", kurdish: "ڕووناکی لە ناو تاریکیدا گەشترە."},
  {id: "e267", category: "love", original: "사랑은 최고의 선물이다.", kurdish: "خۆشەویستی باشترین دیارییە."},
  {id: "e268", category: "wisdom", original: "과거에 얽매이지 마라.", kurdish: "بارمتەی ڕابردوو مەبە."},
  {id: "e269", category: "courage", original: "대담하게 도전하라.", kurdish: "بە بوێرییەوە بجەنگە."},
  {id: "e270", category: "motivation", original: "너는 할 수 있다.", kurdish: "تۆ دەتوانیت."},
  {id: "e271", category: "success", original: "노력하는 자만이 승리한다.", kurdish: "تەنها ئەوەی ماندوو دەبێت دەبردەوە."},
  {id: "e272", category: "life", original: "숨을 쉬는 한 희망은 있다.", kurdish: "تاکو هەناسە دەدەیت، هیوا هەیە."},
  {id: "e273", category: "mindset", original: "마음을 비우면 세상이 보인다.", kurdish: "کاتێک مێشکت پاک دەکەیتەوە، جیهان دەبینیت."},
  {id: "e274", category: "action", original: "바로 지금 시작하라.", kurdish: "ڕاستەوخۆ لەم ساتەدا دەستپێبکە."},
  {id: "e275", category: "happiness", original: "너의 미소가 세상을 밝힌다.", kurdish: "زەردەخەنەکەت جیهان ڕووناک دەکاتەوە."},
  {id: "e276", category: "strength", original: "시련은 나를 단련시킨다.", kurdish: "ناخۆشییەکان من توندوتۆڵ دەکەن."},
  {id: "e277", category: "dreams", original: "꿈을 향해 날아올라라.", kurdish: "بەرەو ئاسمانی خەونەکانت بفڕە."},
  {id: "e278", category: "wisdom", original: "시간을 아껴라.", kurdish: "کاتی خۆت بە هەدەر مەدە."},
  {id: "e279", category: "perseverance", original: "묵묵히 앞만 보고 가라.", kurdish: "بە بێدەنگی تەنها پێش خۆت ببە و بڕۆ."},
  {id: "e280", category: "motivation", original: "주저하지 말고 전진하라.", kurdish: "دوودڵ مەبە و پێشڕەوی بکە."},
  {id: "e281", category: "success", original: "성공은 준비된 자의 몫이다.", kurdish: "سەرکەوتن بۆ کەسێکە کە ئامادەکاری کردووە."},
  {id: "e282", category: "life", original: "삶은 소중한 선물이다.", kurdish: "ژیان دیارییەکی گرانبەهایە."},
  {id: "e283", category: "happiness", original: "오늘 하루도 감사하며 살자.", kurdish: "با ئەمڕۆش بە سوپاسگوزارییەوە بژی."},
  {id: "e284", category: "courage", original: "용기를 내어 한 걸음 내딛어라.", kurdish: "بوێری پەیدا بکە و هەنگاوێک بنێ."},
  {id: "e285", category: "growth", original: "어제의 나를 뛰어넘어라.", kurdish: "لە خۆی دوێنێت تێپەڕە."},
  {id: "e286", category: "hope", original: "새로운 시작은 언제나 설렌다.", kurdish: "دەستپێکی نوێ هەمیشە پڕە لە وروژاندن."},
  {id: "e287", category: "love", original: "사랑은 영원하다.", kurdish: "خۆشەویستی هەمیشەییە."},
  {id: "e288", category: "wisdom", original: "진실은 언제나 승리한다.", kurdish: "ڕاستی هەمیشە سەد دەر سەد سەرکەوتوو دەبێت."},
  {id: "e289", category: "action", original: "실천이 답이다.", kurdish: "کردەوە وەڵامە."},
  {id: "e290", category: "motivation", original: "너의 잠재력을 믿어라.", kurdish: "باوەڕت بە تواناکانی ناوەوەت هەبێت."},
  {id: "e291", category: "success", original: "정상을 향해 올라가라.", kurdish: "بەرەو لوتکە سەربکەوە."},
  {id: "e292", category: "life", original: "즐기면서 살아라.", kurdish: "چێژ لە ژیان وەربگرە و بژی."},
  {id: "e293", category: "mindset", original: "생각이 씨앗이 된다.", kurdish: "بیرکردنەوەکانت دەبنە تۆوی داهاتووت."},
  {id: "e294", category: "happiness", original: "행복은 바이러스처럼 퍼진다.", kurdish: "دڵخۆشی وەک ڤایرۆس بڵاو دەبێتەوە."},
  {id: "e295", category: "strength", original: "시련은 지나가는 바람일 뿐이다.", kurdish: "ناخۆشی تەنها بایەکی تێپەڕبووە."},
  {id: "e296", category: "dreams", original: "꿈을 현실로 만들어라.", kurdish: "خەونەکانت بکە بە ڕاستی."},
  {id: "e297", category: "perseverance", original: "끝까지 포기하지 않는 열정.", kurdish: "ئەو خرۆشەی کە تا کۆتایی کۆڵی پێ نادات."},
  {id: "e298", category: "wisdom", original: "배움에는 왕도가 없다.", kurdish: "هیچ ڕێگەیەکی ئاسان نییە بۆ فێربوون (ماندوبوونی دەوێت)."},
  {id: "e299", category: "action", original: "지금 움직여라.", kurdish: "ئێستا بجووڵێ."},
  {id: "e300", category: "motivation", original: "너의 인생의 주인공은 바로 너다.", kurdish: "پەلاوخۆری سەرەکی ژیانت تەنها خۆتی."}
  ],

  english: [
    {id:"e1",category:"love",original:"You are my favorite kind of forever.",kurdish:"تۆ ئەو هەمیشەییەیت کە زیاتر لە هەموو شتێک دەمەوێت."},
    {id:"e2",category:"love",original:"Some hearts recognize each other in silence.",kurdish:"هەندێک دڵ لە بێدەنگیدا یەکتری دەناسن."},
    {id:"e3",category:"love",original:"You make ordinary moments feel magical.",kurdish:"تۆ ساتە ئاساییەکان دەکەیتە ساتی جادویی."},
    {id:"e4",category:"love",original:"My favorite place is wherever I feel understood.",kurdish:"شوێنی دڵخوازی من ئەو شوێنەیە کە تێیدا تێدەگەیەنرێم."},
    {id:"e5",category:"love",original:"Your smile makes the world feel softer.",kurdish:"پێکەنینەکەت جیهان بە نەرمتر دەردەخات."},
    {id:"e6",category:"love",original:"I find peace in honest conversations.",kurdish:"لە گفتوگۆی ڕاستگۆیانەدا ئارامی دەدۆزمەوە."},
    {id:"e7",category:"love",original:"The little things become memories with you.",kurdish:"شتە بچووکەکان لەگەڵ تۆ دەبنە بیرەوەری."},
    {id:"e8",category:"love",original:"A kind heart is a beautiful kind of love.",kurdish:"دڵێکی میهرەبان جۆرێکی جوانی خۆشەویستییە."},
    {id:"e9",category:"love",original:"You bring warmth to quiet days.",kurdish:"تۆ گەرمی دەبەخشیت بە ڕۆژە بێدەنگەکان."},
    {id:"e10",category:"love",original:"Real affection feels safe, not confusing.",kurdish:"خۆشەویستیی ڕاستەقینە هەستی ئارامی دەدات، نە سەرلێشێواوی."},
    {id:"e11",category:"sad",original:"Sometimes silence carries the heaviest feelings.",kurdish:"هەندێک جار بێدەنگی قورسترین هەستەکان هەڵدەگرێت."},
    {id:"e12",category:"sad",original:"Missing someone can hide inside an ordinary day.",kurdish:"دڵتەنگی بۆ کەسێک دەتوانێت لە ناو ڕۆژێکی ئاساییدا بشاردرێتەوە."},
    {id:"e13",category:"sad",original:"Not every goodbye gets the words it deserves.",kurdish:"هەموو ماڵئاواییکردنێک ئەو وشانەی پێویستی پێیانە وەرناگرێت."},
    {id:"e14",category:"sad",original:"Some memories feel close even after years.",kurdish:"هەندێک بیرەوەری تەنانەت دوای ساڵانیش نزیک هەست پێدەکرێت."},
    {id:"e15",category:"sad",original:"Healing takes patience and kindness.",kurdish:"چاکبوونەوە پێویستی بە ئارامی و میهرەبانییە."},
    {id:"e16",category:"sad",original:"You can miss the past and still move forward.",kurdish:"دەتوانیت دڵتەنگی ڕابردوو بیت و هەروا بەرەو پێش بچیت."},
    {id:"e17",category:"life",original:"Small moments often become our biggest treasures.",kurdish:"ساتە بچووکەکان زۆرجار دەبنە گەورەترین گەنجینەکانمان."},
    {id:"e18",category:"life",original:"Life changes when you learn to notice the good.",kurdish:"ژیان دەگۆڕێت کاتێک فێر دەبیت چاکەکان ببینیت."},
    {id:"e19",category:"life",original:"Every season teaches something new.",kurdish:"هەر وەرزێک شتێکی نوێ فێرمان دەکات."},
    {id:"e20",category:"life",original:"Peace is also a kind of success.",kurdish:"ئارامی خۆیشی جۆرێکە لە سەرکەوتن."},
    {id:"e21",category:"motivation",original:"Your pace is still progress.",kurdish:"خێرایی تۆش هێشتا پێشکەوتنە."},
    {id:"e22",category:"motivation",original:"You are allowed to begin again.",kurdish:"مافیت هەیە دووبارە دەست پێ بکەیتەوە."},
    {id:"e23",category:"motivation",original:"A little courage can open a new door.",kurdish:"کەمێک بوێری دەتوانێت دەرگایەکی نوێ بکاتەوە."},
    {id:"e24",category:"motivation",original:"Be proud of the effort nobody sees.",kurdish:"شانازی بەو هەوڵە بکە کە کەس نایبینێت."},
    {id:"e25",category:"motivation",original:"Your next chapter can be different.",kurdish:"بەشی داهاتووی چیرۆکی ژیانت دەتوانێت جیاواز بێت."},
    {id:"e26",category:"motivation", original: "The best way to get started is to quit talking and begin doing.", kurdish: "باشترین ڕێگا بۆ دەستپێکردن ئەوەیە واز لە قسەکردن بهێنیت و دەست بە کار بکەیت."},
    {id:"e27",category:"life", original: "Life is what happens when you're busy making other plans.", kurdish: "ژیان ئەوەیە کە ڕوودەدات کاتێک تۆ سەرقاڵی پلانی تریت."},
    {id:"e28",category:"love", original: "Loved you yesterday, love you still, always have, always will.", kurdish: "دوێنێ خۆشم ویستیت، ئێستاش خۆشم دەوێیت، هەمیشە هەبووە و هەمیشە دەبم."},
    {id:"e29",category:"sad", original: "Tears come from the heart and not from the brain.", kurdish: "فرمێسک لە دڵەوە دەڕژێت نەک لە مێشکەوە."},
    {id:"e30",category:"motivation", original: "Don't watch the clock; do what it does. Keep going.", kurdish: "سەیری کاتژمێر مەکە؛ ئەوە بکە کە ئەو دەکات. بەردەوام بە."},
    {id:"e32",category:"love", original: "To love and be loved is to feel the sun from both sides.", kurdish: "خۆشەویستی و خۆشەویستبوون واتا هەستکردن بە خۆر لە هەردوولا."},
    {id:"e33",category:"sad", original: "Every human has a secret pain that the world knows not.", kurdish: "هەموو مرۆڤێک ئازارێکی نهێنی هەیە کە جیهان نیزانیت."},
    {id:"e34",category:"motivation", original: "Believe you can and you're halfway there.", kurdish: "باوەڕت بە خۆت هەبێت کە دەتوانیت و نیوەی ڕێگات بڕیوە."},
    {id:"e35",category:"life", original: "Do what you can, with what you have, where you are.", kurdish: "ئەوە بکە کە دەتوانیت، بەو شتەی هەتە، لەو شوێنەی کە هەی."},
    {id:"e36",category:"life", original: "Life isn't about finding yourself. Life is about creating yourself.", kurdish: "ژیان خۆدۆزینەوە نییە، بەڵکو ژیان دروستکردنی خۆتە."},
    {id:"e37",category:"love", original: "If I know what love is, it is because of you.", kurdish: "ئگەر بزانم خۆشەویستی چ چییە، ئەوا بە هۆی تووە."},
    {id:"e38",category:"sad", original: "There is no greater sorrow than to recall in misery the time when we were happy.", kurdish: "هیچ خەمێک گەورەتر نییه لَ یادکردنَوَهِ ئا و کاتِ خۆشانَي که لَ ناخۆشیدا لَ یادمان دێت."},
    {id:"e39",category:"motivation", original: "Act as if what you do makes a difference. It does.", kurdish: "وا هەڵسوکەوت بکە وەک ئەوەی ئەوەی دەیکەیت کاریگەری هەیە؛ چونکە هەیە."},
    {id:"e40",category:"life", original: "Change your thoughts and you change your world.", kurdish: "بیرکردنَوَهِت بگۆڕə تا جیهانت بگۆڕێت."},
    {id:"e41",category:"love", original: "Grow old along with me! The best is yet to be.", kurdish: "پێکəوə پیر ببین! خۆترین بəش هێشتا نهاتووə."},
    {id:"e42",category:"sad", original: "The scars you can't see are the hardest to heal.", kurdish: "ئەو برینانەی کە ناتوانیت ببینی قورس ترینن بۆ سارێژبوون."},
    {id:"e43",category:"motivation", original: "Fall seven times, stand up eight.", kurdish: "حەوت جار بکەوە و هەشت جار هەستەوە."},
    {id:"e44",category:"life", original: "Turn your wounds into wisdom.", kurdish: "برینەکانت بگۆڕە بۆ ژیری."},
    {id:"e45",category:"love", original: "You bring light to my darkest days.", kurdish: "تۆ ڕۆشنایی دێنیتە ناو تاریکترین ڕۆژەکانمەوە."},
    {id:"e46",category:"sad", original: "Sometimes good things fall apart so better things can fall together.", kurdish: "هەندێک جار شتە باشەکان تێکدەشکێن بۆ ئەوەی شتی زۆر باشتر پێکەوە کۆببنەوە."},
    {id:"e47",category:"motivation", original: "Your time is limited, so don't waste it living someone else's life.", kurdish: "کاتی تۆ سنوردارە، کەواتە بە فیڕۆی مەدە بە ژیانکردن لە ژیانی کەسێکی تردا."},
    {id:"e48",category:"sad", original: "The pain will pass, and brighter days will come.", kurdish: "ئازارەکە تێدەپەڕێت و ڕۆژانی ڕووناکتر دێن."},
    {id:"e49",category:"life", original: "Life is 10% what happens to us and 90% how we react to it.", kurdish: "ژیان 10% ئەوەیە کە ڕوودەدات بۆمان و 90% ئەوەی کە دێن."},
    {id:"e50",category:"love", original: "Love is not about how many days, weeks, or months you've been together, it's about how much you love each other every single day.", kurdish: " خۆشەویستی ئەوە نییە کە چەند ڕۆژ، هەفتە یان مانگ پێکەوە بوون، بەڵکو ئەوەیە کە چەندە لە هەموو ڕۆژێکدا یەکتریتان خۆشدەوێت." },
  {id: "e51", category: "motivation", original: "Small steps every day lead to big changes.", kurdish: "هەنگاوە بچووکەکان لە هەموو ڕۆژێکدا دەبنە هۆی گۆڕانکاری گەورە."},
  {id: "e52", category: "success", original: "Success is not final, failure is not fatal: it is the courage to continue that counts.", kurdish: "سەرکەوتن کۆتایی نییە، شکستیش کوندر نییە: ئەوە بوێرێتی بەردەوامبوونە کە گرنگە."},
  {id: "e53", category: "life", original: "Life is what happens when you're busy making other plans.", kurdish: "ژیان ئەوەیە کە ڕوودەدات کاتێک سەرقاڵی پلانی تریت."},
  {id: "e54", category: "mindset", original: "Your only limit is your mind.", kurdish: "تەنها سنورت مێشکت خۆیەتی."},
  {id: "e55", category: "dreams", original: "Dream big and dare to fail.", kurdish: "خەونی گەورە ببینە و بوێری شکستخواردنیشت هەبێت."},
  {id: "e56", category: "action", original: "Don't watch the clock; do what it does. Keep going.", kurdish: "سەیرکردنی کاتژمێر مەکە؛ ئەوە بکە کە ئەو دەکات. بەردەوام بە."},
  {id: "e57", category: "happiness", original: "Happiness is not something ready made. It comes from your own actions.", kurdish: "دڵخۆشی شتێکی ئامادەکراو نییە. بەڵکو لە کردەوەکانی خۆتەوە سەرچاوە دەگرێت."},
  {id: "e58", category: "perseverance", original: "Fall seven times, stand up eight.", kurdish: "حەوت جار بکەوە، هەشت جار هەستەوە."},
  {id: "e59", category: "growth", original: "Do something today that your future self will thank you for.", kurdish: "ئەمڕۆ کارێک بکە کە داهاتووت سوپاست بکات لەسەری."},
  {id: "e60", category: "strength", original: "Difficult roads often lead to beautiful destinations.", kurdish: "ڕێگە سەختەکان زۆر جار دەگەنە شوێنە جوانەکان."},
  {id: "e61", category: "wisdom", original: "The best way to predict the future is to create it.", kurdish: "باشترین ڕێگە بۆ پێشبینیکردنی داهاتوو ئەوەیە کە دروستش بکەیت."},
  {id: "e62", category: "motivation", original: "Believe you can and you're halfway there.", kurdish: "باوەڕت هەبێت کە دەتوانیت و نیوەی ڕێگاکەت بڕیوە."},
  {id: "e63", category: "positivity", original: "Keep your face to the sunshine and you cannot see a shadow.", kurdish: "ڕووت بکەرە تیشکی خۆر و هیچ سێبەرێک نابینیت."},
  {id: "e64", category: "life", original: "Turn your wounds into wisdom.", kurdish: "برینەکانت بگۆڕە بۆ حیکمەت."},
  {id: "e65", category: "success", original: "The secret of getting ahead is getting started.", kurdish: "نهێنی پێشگوتن دەستپێکردنە."},
  {id: "e66", category: "courage", original: "Courage is resistance to fear, mastery of fear - not absence of fear.", kurdish: "بوێری بریتییە لە بەرنگاربوونەوەی ترس، کۆنتڕۆڵکردنی ترس، نەک نەبوونی ترس."},
  {id: "e67", category: "action", original: "Action is the foundational key to all success.", kurdish: "کردەوە کلیلی بنەڕەتییە بۆ هەموو سەرکەوتنێک."},
  {id: "e68", category: "patience", original: "Patience is bitter, but its fruit is sweet.", kurdish: "ئارامگرتن تاڵە، بەڵام بەرەکەی شیرینە."},
  {id: "e69", category: "hope", original: "Hope is a waking dream.", kurdish: "هیوا خەونێکی بێدارە."},
  {id: "e70", category: "love", original: "To love and be loved is to feel the sun from both sides.", kurdish: "خۆشویستن و خۆشویستراو بوون ئەوەیە خۆرت لە هەردوو لایەوە بەرکەوێت."},
  {id: "e71", category: "motivation", original: "It always seems impossible until it's done.", kurdish: "هەمیشە وا دیارە مەحاڵە تا ئەو کاتەی دەکرێت."},
  {id: "e72", category: "success", original: "Don't wait for opportunity. Create it.", kurdish: "چاوەڕێی دەرفەت مەبە. دروستیش بکە."},
  {id: "e73", category: "mindset", original: "Everything you've ever wanted is on the other side of fear.", kurdish: "هەموو ئەوەی کە تا ئێستا باست کردووە لە لایەکەی تری ترسدایە."},
  {id: "e74", category: "life", original: "Life isn't about finding yourself. Life is about creating yourself.", kurdish: "ژیان دۆزینەوەی خۆت نییە. ژیان دروستکردنی خۆتە."},
  {id: "e75", category: "happiness", original: "Smile in the mirror. Do that every morning and you'll start to see a big difference in your life.", kurdish: "لە ئاوێنەکەدا زەردەخەنە بکە. هەموو بەیانییەک ئەمە بکە و دەبینیت جیاوازییەکی گەورە لە ژیانتدا دروست دەبێت."},
  {id: "e76", category: "wisdom", original: "Knowledge is power.", kurdish: "زانین هێزە."},
  {id: "e77", category: "growth", original: "Stay hungry, stay foolish.", kurdish: "برسی بمێنەوە، گەمژە بمێنەوە (لە بەدوای فێربووندا)."},
  {id: "e78", category: "perseverance", original: "Energy and persistence conquer all things.", kurdish: "وزە و بەردەوامی هەموو شتێک زاڵ دەبن."},
  {id: "e79", category: "dreams", original: "A dream doesn't become reality through magic; it takes sweat, determination and hard work.", kurdish: "خەون نابێتە ڕاستی بە سیحر؛ بەڵکو عارەقە، بڕیار و کاری سەختی دەوێت."},
  {id: "e80", category: "strength", original: "Out of difficulties grow miracles.", kurdish: "لە ناو سەختییەکانەوە معجیزەکان گەشە دەکەن."},
  {id: "e81", category: "motivation", original: "Go the extra mile. It's never crowded there.", kurdish: "هەنگاوێکی زیاتر بنێ. هەرگیز لەوێ جەنجاڵ نییە."},
  {id: "e82", category: "success", original: "Opportunities don't happen, you create them.", kurdish: "دەرفەتەکان بە خۆڕایی نایەن، بەڵکو تۆ دروستیان دەکەیت."},
  {id: "e83", category: "life", original: "Do what you can, with what you have, where you are.", kurdish: "ئەوە بکە کە دەتوانیت، بەو شتەی کە هەتە، لەو شوێنەی کە هەی."},
  {id: "e84", category: "mindset", original: "Change your thoughts and you change your world.", kurdish: "بیری خۆت بگۆڕە و جیهازی خۆت دەگۆڕیت."},
  {id: "e85", category: "action", original: "Well done is better than well said.", kurdish: "کردنی کارێکی چاک باشترە لە قسەی جوان."},
  {id: "e86", category: "patience", original: "Adopt the pace of nature: her secret is patience.", kurdish: "خێرای سروشت بگرەبەر: نهێنییەکەی ئارامگرتنە."},
  {id: "e87", category: "hope", original: "Limit your always and your nevers.", kurdish: "وشەکانی هەمیشە و هەرگیز کەم بکەرەوە."},
  {id: "e88", category: "love", original: "Where there is love there is life.", kurdish: "لەو شوێنەی خۆشەویستی هەیە، ژیان هەیە."},
  {id: "e89", category: "wisdom", original: "Simplicity is the ultimate sophistication.", kurdish: "سادەیی بەرزترین ئاستی ڕووناکبیرییە."},
  {id: "e90", category: "growth", original: "Learning never exhausts the mind.", kurdish: "فێربوون هەرگیز مشک هلاک ناکات."},
  {id: "e91", category: "motivation", original: "Hustle in silence and let your success make the noise.", kurdish: "لە بێدەنگیدا کار بکە و با سەرکەوتنەکەت دەنگ بداتەوە."},
  {id: "e92", category: "success", original: "Don't count the days, make the days count.", kurdish: "ژمارەی ڕۆژەکان هەژمار مەکە، ڕۆژەکان بە بەهای بکە."},
  {id: "e93", category: "courage", original: "Fear is only as deep as the mind allows.", kurdish: "ترس تەنها تا ئەو ڕادەیە قووڵە کە مشک ڕێگەی پێدەدات."},
  {id: "e94", category: "happiness", original: "Count your age by friends, not years.", kurdish: "تەمەنت بە هاوڕێکانت هەژمار بکە، نەک بە ساڵەکان."},
  {id: "e95", category: "perseverance", original: "Strive not to be a success, but rather to be of value.", kurdish: "هەوڵ مەدە تەنها سەرکەوتوو بیت، بەڵکو هەوڵ بدە خاوەن بەها بلیت."},
  {id: "e96", category: "dreams", original: "Logic will get you from A to B. Imagination will take you everywhere.", kurdish: "لۆژیک تۆ لە A بۆ B دەبات. خەیاڵ تۆ بۆ هەموو شوێنێک دەبات."},
  {id: "e97", category: "strength", original: "Heavy is the head that wears the crown.", kurdish: "ئەو سەرەی تاج لەسەر دەکات قورسە."},
  {id: "e98", category: "life", original: "The purpose of our lives is to be happy.", kurdish: "ئامانجی ژیانمان ئەوەیە کە دڵخۆش بین."},
  {id: "e99", category: "wisdom", original: "Turn your face to the sun and the shadows fall behind you.", kurdish: "ڕووت بکەرە خۆر و سێبەرەکان دەکەونە دواوەت."},
  {id: "e100", category: "motivation", original: "Don't stop when you're tired. Stop when you're done.", kurdish: "کاتێک ماندوو بووی ڕەوەستە. کاتێک کارەکەت تەواو بوو بوەستە."},
  {id: "e101", category: "success", original: "I find that the harder I work, the more luck I have.", kurdish: "بەوە دەگەم کە هەرچەندە زیاتر کار بکەم، بەختم باشتر دەبێت."},
  {id: "e102", category: "mindset", original: "Whether you think you can, or you think you can't – you're right.", kurdish: "چ پێوابێت دەتوانیت، چ پێوابێت ناتوانیت – لە هەمردوو حاڵەتەکەدا ڕاست دەکەیت."},
  {id: "e103", category: "life", original: "The best revenge is massive success.", kurdish: "باشترین تۆڵەسەندنەوە سەرکەوتنی گەورەیە."},
  {id: "e104", category: "happiness", original: "Worrying does not empty tomorrow of its troubles, it empties today of its strength.", kurdish: "نیگەرانی کێشەکانی سبەی کەمناکاتەوە، بەڵکو هێزی ئەمڕۆت دەبات."},
  {id: "e105", category: "growth", original: "Be so good they can't ignore you.", kurdish: "ئەوەندە باش بە کە نەتوانن پشتگوشت بخەن."},
  {id: "e106", category: "action", original: "A journey of a thousand miles begins with a single step.", kurdish: "گەشتێکی هەزار میل بە یەک هەنگاو دەستپێدەکات."},
  {id: "e107", category: "dreams", original: "The future belongs to those who believe in the beauty of their dreams.", kurdish: "داهاتوو بۆ ئەوانەیە کە باوەڕیان بە جوانی خەونەکانیان هەیە."},
  {id: "e108", category: "patience", original: "Rivers know this: there is no hurry. We shall get there some day.", kurdish: "ڕووبارەکان ئەمە دەزانن: هیچ پەلەیەک نییە. ڕۆژێک دەگەینە ئەوێ."},
  {id: "e109", category: "wisdom", original: "An unexamined life is not worth living.", kurdish: "ژیانێک کە لێی ورد نەبیتەوە شایەنی ژیان نییە."},
  {id: "e110", category: "love", original: "Love is composed of a single soul inhabiting two bodies.", kurdish: "خۆشەویستی پێکدێت لە یەک ڕۆح کە لە ناو دوو جەستەدا دەژین."},
  {id: "e111", category: "motivation", original: "Do what you feel in your heart to be right for you'll be criticized anyway.", kurdish: "ئەوە بکە کە لە دڵتدا ڕاستە، چونکە لە هەر هەلومەرجێکدا ڕەخنەت لێدەگیرێت."},
  {id: "e112", category: "success", original: "Failure is simply the opportunity to begin again, this time more wisely.", kurdish: "شکست تەنها دەرفەتێکە بۆ دەستپێکردنەوە، بەڵام ئەمجارە بە زیرەکییەکی زیاترەوە."},
  {id: "e113", category: "strength", original: "Fall down seven times, stand up eight.", kurdish: "حەوت جار بکەوە، هەشت جار هەستەوە."},
  {id: "e114", category: "life", original: "Life is 10% what happens to you and 90% how you react to it.", kurdish: "ژیان ١٠% ئەوەیە کە بەسەرتدا دێت و ٩٠% چۆنیەتی کاردانەوەی تۆیە بەرامبەری."},
  {id: "e115", category: "mindset", original: "Think big, start small, act now.", kurdish: "بیری گەورە بکە، بچووک دەست پێبکە، ئێستا کار بکە."},
  {id: "e116", category: "courage", original: "Do one thing every day that scares you.", kurdish: "هەموو ڕۆژێک کارێک بکە کە بترسێنێت."},
  {id: "e117", category: "hope", original: "We must accept finite disappointment, but never lose infinite hope.", kurdish: "دەبێت بێهیوا بوونی سنووردار قبووڵ بکەین، بەڵام هەرگیز هیوای بێپایان لەدەست نەدەین."},
  {id: "e118", category: "growth", original: "Formal education will make you a living; self-education will make you a fortune.", kurdish: "خوێندنی فەرمی بژێویت بۆ دابین دەکات؛ خۆڕسکو فێربوون سەروەتت بۆ دەهێنێت."},
  {id: "e119", category: "wisdom", original: "He who has a why to live can bear almost any how.", kurdish: "ئەوەی هۆکارێکی هەبێت بۆ ژیان، دەتوانێت بەرگەی هەر چۆنیەتییەک بگرێت."},
  {id: "e120", category: "happiness", original: "Joy is not in things; it is in us.", kurdish: "خۆشی لە شتەکاندا نییە؛ بەڵکو لە ناو خۆماندایە."},
  {id: "e121", category: "motivation", original: "Go as far as you can see; when you get there, you'll be able to see further.", kurdish: "بڕۆ تا ئەو جێگەیەی دەیبینیت؛ کاتێک گەیشتیتە ئەوێ، دەتوانیت زیاتر ببینی."},
  {id: "e122", category: "success", original: "Success usually comes to those who are too busy to be looking for it.", kurdish: "سەرکەوتن بە زۆری بۆ ئەوانە دێت کە ئەوەندە سەرقاڵن کاتیان نییە بە دوایدا بگەڕێن."},
  {id: "e123", category: "perseverance", original: "Permanence, perseverance and persistence in all actions.", kurdish: "بەردەوامی، کۆشیش و پێداگری لە هەموو کردەوەکاندا."},
  {id: "e124", category: "life", original: "The unexamined life is not worth living.", kurdish: "ژیانێکی بێ لێکۆڵینەوە شایەنی ژیان نییە."},
  {id: "e125", category: "dreams", original: "Go confidently in the direction of your dreams. Live the life you have imagined.", kurdish: "بە متمانەوە بەرەو ئاراستەی خەونەکانت بڕۆ. ئەو ژیانە بژە کە خەپت بۆی بینیوە."},
  {id: "e126", category: "wisdom", original: "In the middle of difficulty lies opportunity.", kurdish: "لە ناوەڕاستی سەختییەکاندا دەرفەت شاراوەتەوە."},
  {id: "e127", category: "strength", original: "What doesn't kill you makes you stronger.", kurdish: "ئەوەیت نەکوژێت بەهێزترت دەکات."},
  {id: "e128", category: "mindset", original: "Action speaks louder than words.", kurdish: "کردەوە لە قسە بەهێزترە."},
  {id: "e129", category: "action", original: "Do it now. Sometimes 'later' becomes 'never'.", kurdish: "ئێستا ئەوی بکە. هەندێک جار 'دواتر' دەبێتە 'هەرگیز'."},
  {id: "e130", category: "love", original: "Loved ones are the true wealth of life.", kurdish: "کەسە خۆشەویستەکان سەروەتی ڕاستەقینەی ژیانن."},
  {id: "e131", category: "motivation", original: "Push yourself, because no one else is going to do it for you.", kurdish: "پاڵ بە خۆتەوە بنێ، چونکە کەسێکی تر بۆت ناکات."},
  {id: "e132", category: "success", original: "Winners are not afraid of losing. But losers are. Failure is part of the process of success.", kurdish: "برەوەکان لە شکست ناترسن. بەڵام دۆڕاوەکان دەترسن. شکست بەشێکە لە پرۆسەی سەرکەوتن."},
  {id: "e133", category: "life", original: "Live every day as if it were your last.", kurdish: "هەموو ڕۆژێک وەکو ئەوە بژە کە دووەمین ڕۆژی ژیانت بێت."},
  {id: "e134", category: "happiness", original: "Count your blessings, not your problems.", kurdish: "بێنەسیدەکانت هەژمار بکە، نەک کێشەکانت."},
  {id: "e135", category: "wisdom", original: "Silence is a true friend who never betrays.", kurdish: "بێدەنگی هاوڕێیەکی ڕاستەقینەیە کە هەرگیز خیانەت ناکات."},
  {id: "e136", category: "growth", original: "Be the change that you wish to see in the world.", kurdish: "بەو گۆڕانکارییەی کە دەتەوێت لە جیهاندا بینی."},
  {id: "e137", category: "patience", original: "He that can have patience can have what he will.", kurdish: "ئەوەی دەتوانێت ئارام بگرێت دەتوانێت هەرچییەکی دەوێت بەدەستی بهێنێت."},
  {id: "e138", category: "courage", original: "Do what is right, not what is easy.", kurdish: "ئەوە بکە کە ڕاستە، نەک ئەوەی کە ئاسانە."},
  {id: "e139", category: "hope", original: "Tomorrow is a new day with no mistakes in it yet.", kurdish: "سبەی ڕۆژێکی نوێیە کە هێشتا هیچ هەڵەیەکی تێدا نەکراوە."},
  {id: "e140", category: "dreams", original: "Reach for the stars even if you have to land on a cloud.", kurdish: "دەست بە ئەستێرەکان ڕابگەیەنە تەنانەت ئەگەر ناچار بایت لەسەر هەورێکیش بنیشیتەوە."},
  {id: "e141", category: "motivation", original: "Great things never come from comfort zones.", kurdish: "شتە مەزنەکان هەرگیز لە ناوچەی ئارامییەوە نایەن."},
  {id: "e142", category: "success", original: "The road to success and the road to success are almost exactly the same.", kurdish: "ڕێگەی سەرکەوتن و شکەست زۆر لە یەکدی دەچن (هەردووکیان ماندووبوونیان دەوێت)."},
  {id: "e143", category: "mindset", original: "Focus on being productive instead of busy.", kurdish: "سەرنجت بخەرە سەر بەرهەمداربوون نەک تەنها سەرقاڵبوون."},
  {id: "e144", category: "life", original: "Life is short, break the rules, forgive quickly, kiss slowly.", kurdish: "ژیان کورتە، یاساکان بشکێنە، زووی لێخۆش ببە، هێواش ماچ بکە."},
  {id: "e145", category: "strength", original: "Storms make trees take deeper roots.", kurdish: "باوەشێنەکان دەبنە هۆی ئەوەی دارەکان ڕیشەی قووڵتر دابکوتن."},
  {id: "e146", category: "wisdom", original: "Wise men speak because they have something to say; fools because they have to say something.", kurdish: "پیاوە زیرەکەکان قسە دەکەن چونكە شتێکیان هەیە بۆ گوتن؛ گەمژەکانیش چونکە دەبێت شتێک بڵێن."},
  {id: "e147", category: "action", original: "Start where you are. Use what you have. Do what you can.", kurdish: "لەو شوێنەی هەی دەست پێبکە. ئەوەی هەتە بەکاری بهێنە. ئەوەی دەتوانیت بکە."},
  {id: "e148", category: "happiness", original: "The most wasted of all days is one without laughter.", kurdish: "بەفیڕۆچووترین ڕۆژ ئەوەیە کە تێیدا پێکەنین نەبێت."},
  {id: "e149", category: "perseverance", original: "It does not matter how slowly you go as long as you do not stop.", kurdish: "گرنگ نییە چەندە خاو بڕۆیت، گرنگ ئەوەیە کە نەوەستیت."},
  {id: "e150", category: "motivation", original: "Your time is limited, so don't waste it living someone else's life.", kurdish: "کاتی تۆ سنووردارە، بۆیە بەفیڕۆی مەدە بە ژیانکردن لە ژیانی کەسێکی تردا."}
  ],

  arabic: [
    {id:"a1",category:"love",original:"أنت أجمل صدفة في حياتي.",kurdish:"تۆ جوانترین ڕووداوی نەچاوەڕوانکراوی ژیانمی."},
    {id:"a2",category:"love",original:"قلبي يعرف طريقه إليك دائمًا.",kurdish:"دڵم هەمیشە ڕێگای خۆی بۆ تۆ دەزانێت."},
    {id:"a3",category:"love",original:"وجودك يجعل الأيام ألطف.",kurdish:"بوونی تۆ ڕۆژەکان خۆشتر دەکات."},
    {id:"a4",category:"love",original:"بعض الأرواح تشبه البيت.",kurdish:"هەندێک ڕۆح وەک ماڵ وان."},
    {id:"a5",category:"love",original:"ابتسامتك نور يومي.",kurdish:"پێکەنینەکەت ڕووناکی ڕۆژەکەمە."},
    {id:"a6",category:"love",original:"أجمل الكلام ما خرج من القلب.",kurdish:"جوانترین قسە ئەوەیە کە لە دڵەوە دێت."},
    {id:"a7",category:"love",original:"معك تصبح التفاصيل الصغيرة جميلة.",kurdish:"لەگەڵ تۆدا وردەکارییە بچووکەکان جوان دەبن."},
    {id:"a8",category:"love",original:"المحبة أفعال قبل أن تكون كلمات.",kurdish:"خۆشەویستی کردارە پێش ئەوەی وشە بێت."},
    {id:"a9",category:"love",original:"أنت ذكرى جميلة في كل يوم.",kurdish:"تۆ لە هەموو ڕۆژێکدا بیرەوەرییەکی جوانیت."},
    {id:"a10",category:"love",original:"الصدق أجمل لغة بين قلبين.",kurdish:"ڕاستگۆیی جوانترین زمانە لە نێوان دوو دڵدا."},
    {id:"a11",category:"sad",original:"أحيانًا يصمت القلب لأنه تعب من الكلام.",kurdish:"هەندێک جار دڵ بێدەنگ دەبێت چونکە لە قسەکردن ماندوو بووە."},
    {id:"a12",category:"sad",original:"للحنين صوت لا يسمعه أحد.",kurdish:"دڵتەنگی دەنگێکی هەیە کە کەس نایبیستێت."},
    {id:"a13",category:"sad",original:"بعض الذكريات تبقى رغم مرور الزمن.",kurdish:"هەندێک بیرەوەری سەرەڕای تێپەڕبوونی کات دەمێننەوە."},
    {id:"a14",category:"sad",original:"ليس كل غياب يعني النسيان.",kurdish:"هەموو نەبوونێک بە مانای لەبیرکردن نییە."},
    {id:"a15",category:"sad",original:"حتى القلوب القوية تحتاج إلى الراحة.",kurdish:"تەنانەت دڵە بەهێزەکانیش پێویستیان بە پشوودانە."},
    {id:"a16",category:"sad",original:"الوقت يعلمنا كيف نتعامل مع الذكريات.",kurdish:"کات فێرمان دەکات چۆن مامەڵە لەگەڵ بیرەوەرییەکان بکەین."},
    {id:"a17",category:"life",original:"الحياة أجمل عندما نقدر التفاصيل الصغيرة.",kurdish:"ژیان جوانترە کاتێک گرنگی بە وردەکارییە بچووکەکان دەدەین."},
    {id:"a18",category:"life",original:"كل يوم فرصة لبداية جديدة.",kurdish:"هەر ڕۆژێک دەرفەتێکە بۆ دەستپێکردنێکی نوێ."},
    {id:"a19",category:"life",original:"راحة البال نعمة كبيرة.",kurdish:"ئارامی دەروون نیعمەتێکی گەورەیە."},
    {id:"a20",category:"life",original:"تعلم أن تستمتع باللحظة.",kurdish:"فێر بە چێژ لە ساتەکە وەربگریت."},
    {id:"a21",category:"motivation",original:"ثق بنفسك وبخطواتك الصغيرة.",kurdish:"باوەڕ بە خۆت و هەنگاوە بچووکەکانت بکە."},
    {id:"a22",category:"motivation",original:"لا بأس أن تبدأ من جديد.",kurdish:"هیچ کێشەیەک نییە دووبارە دەست پێ بکەیتەوە."},
    {id:"a23",category:"motivation",original:"كل محاولة تعلمك شيئًا.",kurdish:"هەر هەوڵێک شتێکت فێر دەکات."},
    {id:"a24",category:"motivation",original:"خطوتك البطيئة أفضل من الوقوف.",kurdish:"هەنگاوی هێواشی تۆ باشترە لە وەستان."},
    {id:"a25",category:"motivation",original:"امنح نفسك فرصة للنمو.",kurdish:"دەرفەت بە خۆت بدە بۆ گەشەکردن."},
  {id: "a101", category: "motivation", original: "الإرادة القوية تختصر الصعاب.", kurdish: "ئیرادەی بەهێز سەختییەکان کورت دەکاتەوە."},
{id: "a102", category: "life", original: "من يلاحق العصفورين يفقد الاثنين.", kurdish: "ئەوەی دوو پەلەوەر ڕاو دکات، هەردووکیان لەدەست دەدات."},
{id: "a103", category: "love", original: "القلوب الطيبة لا تبحث عن شيء سوى الأمان.", kurdish: "دڵە پاکەکان جگە لە ئارامی هیچ شتێکی تر ناگەڕێن."},
{id: "a104", category: "sad", original: "أقسى الألم ما لا يمكن دمعه.", kurdish: "توندترین ئازار ئەوەیە کە فرمێسکەکەی نایەت."},
{id: "a105", category: "life", original: "الوقت كالسيف إن لم تقطعه قطعك.", kurdish: "کات وەک شمشێر واوە ئەگەر نەبڕیتەوە ئەوا دەتبرێتەوە."},
{id: "a106", category: "motivation", original: "اصبر تنل ما تبتغي.", kurdish: "ئارام بگرە ئەوە بەدەست بهێنە کە دەتەوێت."},
{id: "a107", category: "love", original: "الحب الحقيقي لا ينتهي أبدًا.", kurdish: "خۆشەویستی ڕاستەقینە هەرگیز کۆتایی نایەت."},
{id: "a108", category: "sad", original: "الدموع لغة الصمت الحزين.", kurdish: "فرمێسک زمانی بێدەنگی خەمگینە."},
{id: "a109", category: "motivation", original: "من زرع حصد.", kurdish: "ئەوەی چاند، دروێنە دەکات."},
{id: "a110", category: "life", original: "خير الكلام ما قل ودل.", kurdish: "باشترین قسە ئەوەیە کە کەم بێت و مانای گەورەی هەبێت."},
{id: "a111", category: "love", original: "أنت النور في عتمة أيامي.", kurdish: "تۆ ڕۆشنایی لە تاریکی ڕۆژەکانمدایت."},
{id: "a112", category: "sad", original: "بعض الجرح لا يشفى بالكلمات.", kurdish: "هەندێک برین بە قسە سارێژ نابن."},
{id: "a113", category: "motivation", original: "رحلة الألف ميل تبدأ خطوة واحدة.", kurdish: "گەشتی هەزار میل بە یەک هەنگاو دەست پێدەکات."},
{id: "a114", category: "life", original: "العلم في الصغر كالنقش على الحجر.", kurdish: "زانست لە بچووکیدا وەک هەڵکۆڵینە لەسەر بەرد."},
{id: "a115", category: "love", original: "القرب منك ينسيني كل تعب.", kurdish: "نزیکبوون لە تو هەموو ماندووبوونێکم بیر دەباتەوە."},
{id: "a116", category: "sad", original: "أصعب الفراق هو الذي بلا وعود.", kurdish: "قورس ترین جیابوونەوە ئەوەیە کە بێ بەڵێن بێت."},
{id: "a117", category: "motivation", original: "لا تسأل عن غد فإنه آتي بما فيه.", kurdish: "پرس بە سبەینێ مەکە چونکە خۆی بەوەوە دەهێت کە پێیدا هەیە."},
{id: "a118", category: "life", original: "من طلب العلا سهر الليالي.", kurdish: "ئەوەی پلەی بەرز دەوێت شەوانە خەو لێناگەڕێت."},
{id: "a119", category: "love", original: "عيناك هما وطني الوحيد.", kurdish: "چاوی تو تەنها نیشتمانی منن."},
{id: "a120", category: "sad", original: "غربة الروح أصعب من غربة الوطن.", kurdish: "غوربەتی ڕۆح قورسترە لە غوربەتی نیشتمان."},
{id: "a121", category: "motivation", original: "اعمل لدنياك كأنك تعيش أبدا.", kurdish: "کار بۆ جیهانەکەت بکە وەک ئەوەی هەمیشە بژیت."},
{id: "a122", category: "life", original: "الدوام لله وحدَه.", kurdish: "بەردەوامی تەنها بۆ خودایە."},
{id: "a123", category: "love", original: "في حضنك أجد الأمان.", kurdish: "لە باوەشتدا ئارامی دەدۆزمەوە."},
{id: "a124", category: "sad", original: "الوحدة مريحة أحيانا.", kurdish: "تەنهایی هەندێک جار ئارامبەخشە."},
{id: "a125", category: "motivation", original: "كل فكري في طريق النجاح.", kurdish: "هەموو بیرکردنەوەم لە ڕێگەی سەرکەوتندایە."},
  {id: "e301", category: "motivation", original: "من جد وجد ومن زرع حصد.", kurdish: "ئەوەی هەوڵ بدات دەدۆزێتەوە، و ئەوەی بچێنێت دەدوورێتەوە."},
  {id: "e302", category: "success", original: "النجاح ليس قسماً، بل هو عمل واجتهاد.", kurdish: "سەرکەوتن بەخت نییە، بەڵکو کار و کۆشیشە."},
  {id: "e303", category: "life", original: "الأيام تمضي, فاجعل لها أثراً جميلاً.", kurdish: "ڕۆژەکان تێدەپەڕن، بۆیە شوێنپەنجەیەکی جوان بەجێبهێڵە."},
  {id: "e304", category: "mindset", original: "تفائل بما تهوى يكن.", kurdish: "گەشبین بە بەو شتەی حەزت لێیەتی تا بۆت بێتە ڕاستی."},
  {id: "e305", category: "dreams", original: "احلم، فالأحلام هي بداية الحقيقة.", kurdish: "خەون ببینە، چونکە خەونەکان دەستپێکی ڕاستین."},
  {id: "e306", category: "action", original: "لا تسوف العمل إلى الغد.", kurdish: "کار دواخە بۆ سبەی."},
  {id: "e307", category: "happiness", original: "ابتسم، فالحياة قصيرة جداً للحزن.", kurdish: "زەردەخەنە بکە، ژیان زۆر کورتە بۆ خەم."},
  {id: "e308", category: "perseverance", original: "اصبر لكل مصيبة وتجلد، فالدهر دهر والرخاء غد.", kurdish: "بۆ هەموو ناخۆشییەک ئارام بگرە، چونکە کاتەکان دەگۆڕێن و خۆشی سبەی دێت."},
  {id: "e309", category: "growth", original: "من لا يتقدم يتقادم.", kurdish: "ئەوەی پێشڕەوی نەکات کۆن دەبێت."},
  {id: "e310", category: "strength", original: "الشدات تصنع الرجال.", kurdish: "ناخۆشییەکان پیاو دروست دەکەن."},
  {id: "e311", category: "wisdom", original: "الوقت كالسيف إن لم تقطعه قطعك.", kurdish: "کات وەک شمشێر وا بێت ئەگەر نەبڕیتەوە، دەتکوتێت."},
  {id: "e312", category: "motivation", original: "اعمل لدنياك كأنك تعيش أبداً، واعمل لأخرتك كأنك تموت غداً.", kurdish: "بۆ جیهانت کار بکە وەک ئەوەی هەمیشە دەژیت، و بۆ دواڕۆژت کار بکە وەک ئەوەی سبەی دەمریت."},
  {id: "e313", category: "positivity", original: "اصنع لنفسك يوماً جميلاً.", kurdish: "بۆ خۆت ڕۆژێکی جوان دروست بکە."},
  {id: "e314", category: "life", original: "الحياة مدرسة كبرى.", kurdish: "ژیان قوتابخانەیەکی گەورەیە."},
  {id: "e315", category: "success", original: "سر النجاح هو الثبات على المبدأ.", kurdish: "نهێنی سەرکەوتن پابەندبوونە بە بنەماکانەوە."},
  {id: "e316", category: "courage", original: "الشجاعة فضيلة.", kurdish: "بوێری سیفەتێکی باڵایە."},
  {id: "e317", category: "action", original: "خير العمل ما دُوم عليه وإن قل.", kurdish: "باشترین کار ئەوەیە کە بەردەوام بێت تەنانەت ئەگەر کەمیش بێت."},
  {id: "e318", category: "patience", original: "الصبر مفتاح الفرج.", kurdish: "ئارامگرتن کلیلی دەرچوونە."},
  {id: "e319", category: "hope", original: "لا يأس مع الحياة ولا حياة مع اليأس.", kurdish: "بێهیوا بوون لەگەڵ ژیاندا نییە و ژیانیش لەگەڵ بێهیاییدا نییە."},
  {id: "e320", category: "love", original: "الحب الحقيقي لا ينتهي أبداً.", kurdish: "خۆشەویستی ڕاستەقینە هەرگیز کۆتایی نایێت."},
  {id: "e321", category: "motivation", original: "كن أنت التغيير الذي تريده في العالم.", kurdish: "تو خۆت ئەو گۆڕانکارییە بە کە دەتەوێت لە جیهاندا بینی."},
  {id: "e322", category: "success", original: "من طلب العلا سهر الليالي.", kurdish: "ئەوەی پلەی بەرز دەوێت شەوانە خەو دەزڕێنێت."},
  {id: "e323", category: "mindset", original: "عقلك هو سيد فعلك.", kurdish: "مێشکت سەرکردەی کردەوەکانتە."},
  {id: "e324", category: "life", original: "تفاءلوا بالخير تجدوه.", kurdish: "گەشبین بن بە خێر تا پێی بگەن."},
  {id: "e325", category: "happiness", original: "السعادة في الإحسان إلى الآخرين.", kurdish: "دڵخۆشی لە چاکەکاریکردندایە لەگەڵ کەسانی تردا."},
  {id: "e326", category: "wisdom", original: "خير الكلام ما قل ودل.", kurdish: "باشترین قسە ئەوەیە کە کورت بێت و مەبەست بپێکێت."},
  {id: "e327", category: "growth", original: "اطلب العلم من المهد إلى اللحد.", kurdish: "لە لانکەوە تا گۆڕ داوای زانین بکە."},
  {id: "e328", category: "perseverance", original: "لا تقنطوا من رحمة الله.", kurdish: "لە بەزەیی خودا بێهیوا مەبن."},
  {id: "e329", category: "dreams", original: "حقق أحلامك بصمت.", kurdish: "خەونەکانت لە بێدەنگیدا بهێنەدی."},
  {id: "e330", category: "strength", original: "المؤمن القوي خير وأحب إلى الله.", kurdish: "باوەڕداری بەهێز خێرە و خۆشەویستترە لای خودا."},
  {id: "e331", category: "motivation", original: "استعن بالله ولا تعجز.", kurdish: "پشتی بە خودا بەست و بێهیوامەبە."},
  {id: "e332", category: "success", original: "الاجتماع يبدأ بالتكاتف والنجاح بالاستمرار.", kurdish: "پێکەوەبوون بە هاوکاری دەستپێدەکات و سەرکەوتنیش بە بەردەوامی."},
  {id: "e333", category: "life", original: "العمر قصير فلا تبدده في الغضب.", kurdish: "تەمەن کورتە بۆیە لە تووڕەییدا بەهەدەری مەدە."},
  {id: "e334", category: "mindset", original: "افعل ما ترتاح له، فترضى.", kurdish: "ئەوە بکە کە پێی ئارام دەبیت، تا ڕازی بلیت."},
  {id: "e335", category: "action", original: "بادر ولا تتردد.", kurdish: "پێش دەستپێشخەری بە و دوودڵ مەبە."},
  {id: "e336", category: "patience", original: "اصبر قليلاً فبعد العسر تيسير.", kurdish: "کەمێک ئارام بگرە، چونکە لە دوای سەختی ئاسانکاری دێت."},
  {id: "e337", category: "hope", original: "كل ليل له نهاية وصبح جديد.", kurdish: "هەموو تاریکییەک کۆتایی و بەیانییەکی نوێی هەیە."},
  {id: "e338", category: "love", original: "المحبة تستر كل الهفوات.", kurdish: "خۆشەویستی هەموو هەڵەکان دەپۆشێت."},
  {id: "e339", category: "wisdom", original: "لسانك حصانك إن حفظته حفظك.", kurdish: "زمانت ئەسپەکەتە، ئەگەر بیپارێزیت دەتپارێزێت."},
  {id: "e340", category: "growth", original: "تجارب الأمس هي دروس الغد.", kurdish: "ئەزموونەکانی دوێنێ وانەکانی سبەین."},
  {id: "e341", category: "motivation", original: "ابدأ من حيث أنت، وافعل ما تستطيع.", kurdish: "لەو شوێنەی کە هەی دەستپێبکە، و ئەوە بکە کە دەتوانیت."},
  {id: "e342", category: "success", original: "رحلة الألف ميل تبدأ بخطوة.", kurdish: "گەشتی هەزار میل بە هەنگاوێک دەستپێدەکات."},
  {id: "e343", category: "courage", original: "واجه مخاوفك بشجاعة.", kurdish: "ڕووبەڕووی ترسەکانت ببەوە بە بوێرییەوە."},
  {id: "e344", category: "life", original: "اعمل بصمت واجعل النجاح يتحدث.", kurdish: "لە بێدەنگیدا کار بکە و با سەرکەوتن بدوێت."},
  {id: "e345", category: "happiness", original: "الرضا بالقسمة هو الراحة الكبرى.", kurdish: "ڕازیبوون بە بەش بە گەورەترین ئارامی دادەنرێت."},
  {id: "e346", category: "strength", original: "الضربة التي لا تقتلني تقويني.", kurdish: "ئەو لێدانەی کە نامکوژێت، بەهێزترم دەکات."},
  {id: "e347", category: "dreams", original: "الوطن الحقيقي للأحلام هو العزيمة.", kurdish: "نیشتمانی ڕاستەقینەی خەونەکان بڕیار و تینە."},
  {id: "e348", category: "wisdom", original: "من يقرأ يكتسب عقولاً إضافية.", kurdish: "ئەوەی بخوێنێتەوە مێشکی زیاتر بەدەست دەهێنێت."},
  {id: "e349", category: "action", original: "اعمل اليوم لتجني غداً.", kurdish: "ئەمڕۆ کار بکە تا سبەی دروێنە بکەیت."},
  {id: "e350", category: "motivation", original: "لا تدع شيئاً يكسر إرادتك.", kurdish: "مەهێڵە هیچ شتێک ئیرادەت بشکێنێت."},
  {id: "e351", category: "success", original: "النجاح يبدأ من القرار.", kurdish: "سەرکەوتن لە بڕیاردانەوە دەستپێدەکات."},
  {id: "e352", category: "mindset", original: "فكر بإيجابية تعش بسعادة.", kurdish: "ئەرێنی بیربکەرەوە تا بە دڵخۆشی بژی."},
  {id: "e353", category: "life", original: "الحياة تستحق أن تعاش بأمل.", kurdish: "ژیان شایەنی ئەوەیە بە هیواوە بژیت."},
  {id: "e354", category: "happiness", original: "اصنع سعادتك بيديك.", kurdish: "دڵخۆشی خۆت بە دەستەکانی خۆت دروست بکە."},
  {id: "e355", category: "growth", original: "تعلم من أخطائك ولا تكررها.", kurdish: "لە هەڵەکانت فێربە و دووبارەیان مەکە."},
  {id: "e356", category: "patience", original: "اصبر على كيد الحسود فإن صبرك قاتله.", kurdish: "ئارام بگرە لە بەرامبەر پیلانی حەسوددا، چونکە ئارامگرتنت دەیکوژێت."},
  {id: "e357", category: "hope", original: "الشمس تشرق بعد كل عاصفة.", kurdish: "خۆر لە پاش هەموو گەردوولێک هەڵدێت."},
  {id: "e358", category: "love", original: "الحب عطاء بلا حدود.", kurdish: "خۆشەویستی بەخشینە بێ سنوور."},
  {id: "e359", category: "wisdom", original: "عقول الأناس تزن بأقوالهم.", kurdish: "مێشکی مرۆڤەکان بە قسەکانیان دەپێورێت."},
  {id: "e360", category: "motivation", original: "كن قوياً فالمرور بصعوبات يكسبك مناعة.", kurdish: "بەهێز بە، تێپەڕبوون بە ناخۆشییەکاندا بەرگریت پێدەبەخشێت."},
  {id: "e361", category: "success", original: "التميز ليس استثناء بل هو عادة.", kurdish: "جیاوازی و نایابی حاڵەتێکی تایبەت نییە، بەڵکو خووە."},
  {id: "e362", category: "courage", original: "كن جريئاً لتحقيق ما تتمناه.", kurdish: "بوێر بە بۆ بەدیهێنانی ئەوەی ئارەزووی دەکەیت."},
  {id: "e363", category: "life", original: "كل يوم هو فرصة جديدة.", kurdish: "هەموو ڕۆژێک دەرفەتێکی نوێیە."},
  {id: "e364", category: "action", original: "انطلق نحو أهدافك بكل قوة.", kurdish: "بە هەموو هێزێکەوە بەرەو ئامانجەکانت بڕۆ."},
  {id: "e365", category: "happiness", original: "الابتسامة لغة القلوب.", kurdish: "زەردەخەنە زمانی دڵەکانە."},
  {id: "e366", category: "strength", original: "العزيمة الصادقة تزيل الجبال.", kurdish: "ئیرادەی ڕاستەقینە چیاکان لابردە."},
  {id: "e367", category: "dreams", original: "اجعل أهدافك أكبر من مخاوفك.", kurdish: "ئامانجەکانت لە ترسەکانت گەورەتر بکە."},
  {id: "e368", category: "wisdom", original: "من لا يستحي يرتكب ما يشاء.", kurdish: "ئەوەی شەرم نەبێت هەرچییەکی حەز لێبێت دەیکات."},
  {id: "e369", category: "growth", original: "التطور المستمر هو سر البقاء.", kurdish: "پێشکەوتنی بەردەوام نهێنی بمێنێتەوە."},
  {id: "e370", category: "motivation", original: "لا تتوقف عندما تكون متعباً، توقف عندما تنتهي.", kurdish: "کاتێک ماندوو بووی ڕەوەستە، کاتێک تەواو بووی بوەستە."},
  {id: "e371", category: "success", original: "النجاح يصنعه الأبطال.", kurdish: "سەرکەوتن پاڵەوانەکان دروستی دەکەن."},
  {id: "e372", category: "mindset", original: "تفكيرك يصنع واقعك.", kurdish: "بیرکردنەوەکانت ڕاستییەکەت دروست دەکەن."},
  {id: "e373", category: "life", original: "عش كل لحظة كأنها الأخيرة.", kurdish: "هەموو ساتێک بژە وەکو ئەوەی دواسات بێت."},
  {id: "e374", category: "patience", original: "اصبر حتى ينقضي الصبر.", kurdish: "ئارام بگرە تا کاتی ئارامگرتن تەواو دەبێت."},
  {id: "e375", category: "hope", original: "أمل جديد يولد مع كل صباح.", kurdish: "هیوایەکی نوێ لەگەڵ هەموو بەیانییەکدا لەدایک دەبێت."},
  {id: "e376", category: "love", original: "القلوب الطاهرة تحب بصدق.", kurdish: "دڵە پاکەکان بە ڕاستگۆیی خۆشەویستی دەکەن."},
  {id: "e377", category: "wisdom", original: "من زرع حصد الخير.", kurdish: "ئەوەی چاکە بچێنێت خێر دەدروێنێتەوە."},
  {id: "e378", category: "action", original: "ابدأ بتنفيذ أفكارك الآن.", kurdish: "ئێستا دەست بە جێبەجێکردنی بیرۆکەکانت بکە."},
  {id: "e379", category: "courage", original: "لا تخف من الفشل، فهو طريق النجاح.", kurdish: "لە شکست مەترسە، چونکە ئەو ڕێگەی سەرکەوتنە."},
  {id: "e380", category: "growth", original: "اقرأ لتتسع مداركك.", kurdish: "بخوێنەرەوە تا تێڕوانینت فراوان ببێت."},
  {id: "e381", category: "motivation", original: "عش حياتك بعزيمة وإرادة.", kurdish: "ژیانت بە ئیرادە و تینەوە بژە."},
  {id: "e382", category: "success", original: "العزم الصادق يقود إلى القمة.", kurdish: "سووربوونی ڕاستەقینە بەرەو لوتکەت دەبات."},
  {id: "e383", category: "life", original: "اجعل سيرتك معطرة بالخير.", kurdish: "ژیاننامەکەت بە چاکە بۆنخۆش بکە."},
  {id: "e384", category: "happiness", original: "كن سبباً في سعادة غيرك.", kurdish: "هۆکارێک بە بۆ دڵخۆشکردنی کەسانی تر."},
  {id: "e385", category: "strength", original: "الصبر جنة في وجه المحن.", kurdish: "ئارامگرتن قەڵایەکە لە بەرامبەر ناخۆشییەکاندا."},
  {id: "e386", category: "dreams", original: "حلق في سماء الطموح.", kurdish: "لە ئاسمانی هیوادا بفڕە."},
  {id: "e387", category: "wisdom", original: "خير الإخوان من نصحك.", kurdish: "باشترین برا ئەوەیە کە ئامۆژگاریت دەکات."},
  {id: "e388", category: "action", original: "أحسن الظن واعمل بجد.", kurdish: "گومانی چاکت هەبێت و بە سەختی کار بکە."},
  {id: "e389", category: "patience", original: "اصبر فنعم العاقبة الصابرين.", kurdish: "ئارام بگرە، چونکە ئارامگرەکان باشترین کۆتاییان هەیە."},
  {id: "e390", category: "hope", original: "الغد أفضل لمن يؤمن بنفسه.", kurdish: "سبەی باشترە بۆ کەسێک کە باوەڕی بە خۆی هەیە."},
  {id: "e391", category: "motivation", original: "لا تنتظر الفرصة بل اصنعها.", kurdish: "چاوەڕێی دەرفەت مەبە، بەڵکو دروستی بکە."},
  {id: "e392", category: "success", original: "العمل الجاد لا يذهب سدى.", kurdish: "کاری سەخت بەفیڕۆ نادڕێت."},
  {id: "e393", category: "life", original: "التجربة خير برهان.", kurdish: "ئەزموون باشترین بەڵگەیە."},
  {id: "e394", category: "mindset", original: "كن إيجابياً وتخط العقبات.", kurdish: "ئەرێنی بە و بەربەستەکان ببڕە."},
  {id: "e395", category: "happiness", original: "راحة البال هي الغنى الأكبر.", kurdish: "ئارامی مێشک گەورەترین دەوڵەمەندییە."},
  {id: "e396", category: "growth", original: "تطلع دائماً للأفضل.", kurdish: "هەمیشە چاوت لە باشترینەکان بێت."},
  {id: "e397", category: "courage", original: "واجه الصعاب بصدر رحب.", kurdish: "ڕووبەڕووی سەختییەکان ببەوە بە سینەیەکی فراوانەوە."},
  {id: "e398", category: "wisdom", original: "التواضع زين الرجال.", kurdish: "خۆبەخستنەخوارەوە جوانی پیاوانە."},
  {id: "e399", category: "action", original: "انهض وابدأ من جديد.", kurdish: "هەستەوە و لە سەرەتایەوە دەستپێبکە."},
  {id: "e400", category: "motivation", original: "أنت قادر على تحقيق المستحيل.", kurdish: "تۆ دەسەڵاتت هەیە بۆ بەدیهێنانی مەحاڵ."}
],

  hindi: [
    {id:"h1",category:"love",original:"तुम मेरी सबसे प्यारी मुस्कान हो।",kurdish:"تۆ خۆشترین پێکەنینی منیت."},
    {id:"h2",category:"love",original:"तुम्हारे साथ हर पल खास है।",kurdish:"هەر ساتێک لەگەڵ تۆ تایبەتە."},
    {id:"h3",category:"love",original:"मेरा दिल तुम्हें याद करता है।",kurdish:"دڵم بیرت دەکاتەوە."},
    {id:"h4",category:"love",original:"तुम मेरी दुनिया का सुंदर हिस्सा हो।",kurdish:"تۆ بەشێکی جوانی جیهانی منیت."},
    {id:"h5",category:"love",original:"सच्चा प्यार सम्मान से बढ़ता है।",kurdish:"خۆشەویستیی ڕاستەقینە بە ڕێزگرتن گەشە دەکات."},
    {id:"h6",category:"love",original:"तुम्हारी खुशी मेरे लिए मायने रखती है।",kurdish:"خۆشیی تۆ لام گرنگە."},
    {id:"h7",category:"love",original:"कुछ रिश्ते दिल को सुकून देते हैं।",kurdish:"هەندێک پەیوەندی ئارامی بە دڵ دەبەخشن."},
    {id:"h8",category:"love",original:"तुम्हारी बातें यादों में रहती हैं।",kurdish:"قسەکانت لە بیرەوەرییەکانمدا دەمێننەوە."},
    {id:"h9",category:"love",original:"प्यार छोटे कामों में दिखाई देता है।",kurdish:"خۆشەویستی لە کردارە بچووکەکاندا دەردەکەوێت."},
    {id:"h10",category:"love",original:"तुम्हारे साथ साधारण दिन भी सुंदर है।",kurdish:"لەگەڵ تۆدا ڕۆژی ئاساییش جوانە."},
    {id:"h11",category:"sad",original:"कभी-कभी खामोशी बहुत कुछ कहती है।",kurdish:"هەندێک جار بێدەنگی زۆر شت دەڵێت."},
    {id:"h12",category:"sad",original:"यादें दिल में धीरे से रहती हैं।",kurdish:"بیرەوەرییەکان بە هێواشی لە دڵدا دەمێننەوە."},
    {id:"h13",category:"sad",original:"हर दूरी रास्तों से नहीं मापी जाती।",kurdish:"هەموو دوورییەک بە ڕێگا پێوانە ناکرێت."},
    {id:"h14",category:"sad",original:"कुछ बातें समय के साथ समझ आती हैं।",kurdish:"هەندێک شت لەگەڵ کاتدا تێدەگەین."},
    {id:"h15",category:"sad",original:"दिल को भी आराम चाहिए।",kurdish:"دڵیش پێویستی بە پشوودانە."},
    {id:"h16",category:"sad",original:"उदासी हमेशा नहीं रहती।",kurdish:"خەمیش هەمیشە نامێنێتەوە."},
    {id:"h17",category:"life",original:"हर सुबह एक नई शुरुआत है।",kurdish:"هەر بەیانییەک دەستپێکردنێکی نوێیە."},
    {id:"h18",category:"life",original:"छोटी खुशियाँ जीवन को सुंदर बनाती हैं।",kurdish:"خۆشییە بچووکەکان ژیان جوان دەکەن."},
    {id:"h19",category:"life",original:"अपने आज की कदर करो।",kurdish:"گرنگی بە ئەمڕۆی خۆت بدە."},
    {id:"h20",category:"life",original:"शांति भी एक बड़ी खुशी है।",kurdish:"ئارامیش خۆشییەکی گەورەیە."},
    {id:"h21",category:"motivation",original:"अपनी गति से आगे बढ़ो।",kurdish:"بە خێرایی خۆت بەرەو پێش بچۆ."},
    {id:"h22",category:"motivation",original:"गलतियाँ सीखने का हिस्सा हैं।",kurdish:"هەڵەکان بەشێکن لە فێربوون."},
    {id:"h23",category:"motivation",original:"खुद पर विश्वास रखो।",kurdish:"باوەڕ بە خۆت بکە."},
    {id:"h24",category:"motivation",original:"छोटी कोशिश भी मायने रखती है।",kurdish:"هەوڵی بچووکیش گرنگە."},
    {id:"h25",category:"motivation",original:"तुम फिर से शुरुआत कर सकते हो।",kurdish:"دەتوانیت دووبارە دەست پێ بکەیتەوە."},
    {id:"h26", category: "motivation", original: "कर्म करो फल की चिंता मत करो.", kurdish: "کار بکە و نیگەرانی ئەنجامەکەی مەکە."},
{id: "h27", category: "life", original: "समय किसी के लिए नहीं रुकता.", kurdish: "کات بۆ هیچ کەسێک ناوەستێت."},
{id: "h28", category: "love", original: "प्यार दुनिया की सबसे खूबसूरत चीज है.", kurdish: "خۆشەویستی جوانترین شتی جیهانە."},
{id: "h104", category: "sad", original: "आंसुओं से दिल का दर्द कम होता है.", kurdish: "فرمێسک ئازاری دڵ کەم دەکاتەوە.", signature: "M~A~MARAL"},
{id: "h105", category: "motivation", original: "कोशिश करने वालों की कभी हार नहीं होती.", kurdish: "ئەوەی هەوڵ بدات هەرگیز شکستخواردوو نابێت."},
{id: "h106", category: "life", original: "सच्चाई की हमेशा जीत होती है.", kurdish: "راستی هەمیشە سەرکەوتوو دەبێت."},
{id: "h107", category: "love", original: "तुम मेरी दुनिया हो.", kurdish: "تۆ جیهانی منی."},
{id: "h108", category: "sad", original: "अकेलेपन का दर्द बहुत गहरा होता है.", kurdish: "ئازاری تەنهایی زۆر قوڵە."},
{id: "h109", category: "motivation", original: "डर के आगे जीत है.", kurdish: "لەپێش ترسەوە سەرکەوتن هەیە."},
{id: "h110", category: "life", original: "जैसा बोवोगे वैसा काटोगे.", kurdish: "چۆن بچێنیت ئاوا دروێنە دەکەیت."},
{id: "h111", category: "love", original: "तुम्हारी हंसी मेरी खुशी है.", kurdish: "پێکەنینی تو خۆشی منە."},
{id: "h112", category: "sad", original: "यादें हमेशा रुलाती हैं.", kurdish: "یادەوەرییەکان هەمیشە دەگریێنن."},
{id: "h113", category: "motivation", original: "मंजिल उन्हीं को मिलती है जिनके सपनों में जान होती है.", kurdish: "ئامانج بۆ ئەو کەسانەیە کە خەونەکانیان گیانی تێدایە."},
{id: "h114", category: "life", original: "जिंदगी एक सफर है.", kurdish: "ژیان گەشتێکە."},
{id: "h115", category: "love", original: "मेरा दिल तुम्हारे बिना अधूरा है.", kurdish: "دڵم بێ تو تەواو نییە."},
{id: "h116", category: "sad", original: "कुछ बातें अधूरी रह जाती हैं.", kurdish: "هەندێک قسە بە تەواوەتی ناگوترێن."},
{id: "h117", category: "motivation", original: "खुद पर विश्वास रखो.", kurdish: "باوەڕت بە خۆت هەبێت."},
{id: "h118", category: "life", original: "अनुभव सबसे बड़ा शिक्षक है.", kurdish: "ئەزموون گەورەترین مامۆستایە."},
{id: "h119", category: "love", original: "तुम मेरे दिल की धड़कन हो.", kurdish: "تۆ لێدانی دڵی منی."},
{id: "h120", category: "sad", original: "वक्त हर जख्म भर देता है.", kurdish: "کات هەموو برینێک پڕ دەکاتەوە."},
{id: "h121", category: "motivation", original: "कड़ी मेहनत का कोई विकल्प नहीं है.", kurdish: "هیچ جێگرەوەیەک بۆ ماندووبوونی ڕژد نییە."},
{id: "h122", category: "life", original: "आशा ही जीवन है.", kurdish: "هیوایە کە ژیانە."},
{id: "h123", category: "love", original: "हमेशा साथ रहना.", kurdish: "هەمیشە پێکەوە بمێننەوە."},
{id: "h124", category: "sad", original: "खामोशी भी एक भाषा है.", kurdish: "بێدەنگیش زمانێکە."},
{id: "h125", category: "motivation", original: "सफलता मेहनत मांगती है.", kurdish: "سەرکەوتن ماندووبوونی دەوێت."},
  {id: "e401", category: "motivation", original: "कर्म करो, फल की चिंता मत करो.", kurdish: "کار بکە، نیگەرانی ئەنجامەکە مەبە."},
  {id: "e402", category: "success", original: "सफलता कभी अंतिम नहीं होती.", kurdish: "سەرکەوتن هەرگیز کۆتایی نییە."},
  {id: "e403", category: "life", original: "जिंदगी एक सफर है, इसे खुशी से जियो.", kurdish: "ژیان گەشتێکە، بە دڵخۆشییەوە بژی."},
  {id: "e404", category: "mindset", original: "जैसा आप सोचते हैं, वैसे आप बनते हैं.", kurdish: "وەکو ئەوە بیردەکەیتەوە، دەبیت بەو کەسە."},
  {id: "e405", category: "dreams", original: "अपने सपनों को सच करने की हिम्मत रखो.", kurdish: "بوێریت هەبێت بۆ بەدیهێنانی خەونەکانت."},
  {id: "e406", category: "action", original: "कल कभी नहीं आता, जो करना है आज करो.", kurdish: "سبەی هەرگیز نایێت، هەرچتێک دەبێت بیکەیت ئەمڕۆ بکە."},
  {id: "e407", category: "happiness", original: "खुश रहना ही सबसे बड़ा धर्म है.", kurdish: "دڵخۆش بوون گەورەترین ئاینی مرۆڤایەتییە."},
  {id: "e408", category: "perseverance", original: "कोशिश करने वालों की कभी हार नहीं होती.", kurdish: "ئەوانەی هەوڵ دەدەن هەرگیز ناڕووخێن و ناوڕێن."},
  {id: "e409", category: "growth", original: "हर दिन कुछ नया सीखो.", kurdish: "هەموو ڕۆژێک شتێکی نوێ فێربە."},
  {id: "e410", category: "strength", original: "मुश्किलें इंसान को मजबूत बनाती हैं.", kurdish: "سەختییەکان مرۆڤ بەهێز دەکەن."},
  {id: "e411", category: "wisdom", original: "ज्ञान ही सबसे बड़ी शक्ति है.", kurdish: "زانین گەورەترین هێزە."},
  {id: "e412", category: "motivation", original: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य न मिल जाए.", kurdish: "هەستە، بیدار بە و مەوەستە تاوەکو دەگەیە ئامانجەکەت."},
  {id: "e413", category: "positivity", original: "सकारात्मक सोच जीवन बदल देती है.", kurdish: "بیری ئەرێنی ژیان دەگۆڕێت."},
  {id: "e414", category: "life", original: "जीवन एक अवसर है, इसका लाभ उठाओ.", kurdish: "ژیان دەرفەتێکە، بیقۆزەوە."},
  {id: "e415", category: "success", original: "कड़ी मेहनत का कोई विकल्प नहीं है.", kurdish: "هیچ جێگرەوەیەک بۆ کاری سەخت نییە."},
  {id: "e416", category: "courage", original: "डर का सामना करना ही बहादुरी है.", kurdish: "ڕووبەڕووبوونەوەی ترس خودی بوێرییە."},
  {id: "e417", category: "action", original: "समय किसी का इंतजार नहीं करता.", kurdish: "کات چاوەڕێی کەس ناکات."},
  {id: "e418", category: "patience", original: "धैर्य का फल मीठा होता है.", kurdish: "بەرەکەی ئارامگرتن شیرینە."},
  {id: "e419", category: "hope", original: "उम्मीद पर दुनिया कायम है.", kurdish: "جیهان لەسەر هیوا دەمێنێتەوە."},
  {id: "e420", category: "love", original: "प्रेम ही जीवन का आधार है.", kurdish: "خۆشەویستی بنەمای ژیانە."},
  {id: "e421", category: "motivation", original: "खुद पर विश्वास रखो, सब संभव है.", kurdish: "باوەڕت بە خۆت هەبێت، هەموو شتێک دەکرێت."},
  {id: "e422", category: "success", original: "जितनी बड़ी मेहनत, उतनी बड़ी सफलता.", kurdish: "چەندە ماندووبوون گەورەتر بێت، سەرکەوتنیش گەورەترە."},
  {id: "e423", category: "mindset", original: "विचारों को शुद्ध रखो.", kurdish: "بیرکردنەوەکانت پاک ڕابگرە."},
  {id: "e424", category: "life", original: "खुशी बाहर नहीं, अंदर होती है.", kurdish: "دڵخۆشی لە دەرەوە نییە، بەڵکو لە ناوەوەیە."},
  {id: "e425", category: "happiness", original: "मुस्कुराना सबसे अच्छा गहना है.", kurdish: "زەردەخەنە کردن باشترین خشڵە."},
  {id: "e426", category: "wisdom", original: "सत्य की हमेशा जीत होती है.", kurdish: "ڕاستی هەمیشە دەبردەوە."},
  {id: "e427", category: "growth", original: "अनुभव सबसे अच्छा शिक्षक है.", kurdish: "ئەزموون باشترین مامۆستایە."},
  {id: "e428", category: "perseverance", original: "लगातार प्रयास ही सफलता की कुंजी है.", kurdish: "هەوڵی بەردەوام کلیلی سەرکەوتنە."},
  {id: "e429", category: "dreams", original: "बड़े सपने देखो और उन्हें पूरा करो.", kurdish: "خەونی گەورە ببینە و بهێنەدی."},
  {id: "e430", category: "strength", original: "विश्वास में असीम शक्ति है.", kurdish: "باوەڕ هێزێکی بێسنووری تێدایە."},
  {id: "e431", category: "motivation", original: "अपनी तकदीर खुद लिखो.", kurdish: "چارەنووسی خۆت بە دەستەکانی خۆت بنووسە."},
  {id: "e432", category: "success", original: "असफलता सफलता की सीढ़ी है.", kurdish: "شکست پلیسکانە بۆ سەرکەوتن."},
  {id: "e433", category: "life", original: "हर पल का आनंद लो.", kurdish: "چێژ لە هەموو ساتێک وەربگرە."},
  {id: "e434", category: "mindset", original: "अपनी सोच को ऊंची रखो.", kurdish: "تێڕوانین و بیرکردنەوەکانت بەرز ڕابگرە."},
  {id: "e435", category: "action", original: "आज की मेहनत कल का भविष्य है.", kurdish: "ماندووبوونی ئەمڕۆ داهاتووی سبەین."},
  {id: "e436", category: "patience", original: "शांत मन से सब हल होता है.", kurdish: "بە مێشکێکی ئارام هەموو شتێک چارەسەر دەبێت."},
  {id: "e437", category: "hope", original: "अंधेरे के बाद उजाला जरूर होता है.", kurdish: "لە پاش تاریکی بێگومان ڕووناکی هەیە."},
  {id: "e438", category: "love", original: "प्यार से दुनिया जीती जाती है.", kurdish: "بە خۆشەویستی جیهان دەبێت."},
  {id: "e439", category: "wisdom", original: "कम बोलो, ज्यादा सुनो.", kurdish: "کەم قسە بکە، زۆر گوێ بگرە."},
  {id: "e440", category: "growth", original: "सीखना कभी बंद मत करो.", kurdish: "هەرگیز فێربوون ڕەوەستێنە."},
  {id: "e441", category: "motivation", original: "अपनी कमियों को अपनी ताकत बनाओ.", kurdish: "لاوازییەکانت بکە بە هێزی خۆت."},
  {id: "e442", category: "success", original: "लक्ष्य पर नजर रखो.", kurdish: "چاوترسێن بە بۆ سەر ئامانجەکەت."},
  {id: "e443", category: "courage", original: "निडर बनो और आगे बढ़ो.", kurdish: "ترست نەبێت و هەنگاو بنێ بۆ پێشەوە."},
  {id: "e444", category: "life", original: "जीवन एक अनमोल उपहार है.", kurdish: "ژیان دیارییەکی گرانبەهایە."},
  {id: "e445", category: "happiness", original: "दूसरों की मदद करने से खुशी मिलती है.", kurdish: "یارمەتیدانی ئەوانی تر دڵخۆشی دەبەخشێت."},
  {id: "e446", category: "strength", original: "मन के हारे हार, मन के जीते जीत.", kurdish: "شکست بە دڵ دەشکێیت، سەرکەوتنیش بە دڵ دەبێتەوە."},
  {id: "e447", category: "dreams", original: "खुली आँखों से सपने देखो.", kurdish: "بە چاوی کراوە خەون ببینە."},
  {id: "e448", category: "wisdom", original: "अच्छा व्यवहार ही सच्ची पहचान है.", kurdish: "هەڵسوکەوتی جوان ناسنامەی ڕاستەقینەیە."},
  {id: "e449", category: "action", original: "कामयाबी सिर्फ बोलने से नहीं, करने से मिलती है.", kurdish: "سەرکەوتن بە قسەکردن نایێت، بەڵکو بە کارکردن دێت."},
  {id: "e450", category: "motivation", original: "हर चुनौती एक नया मौका है.", kurdish: "هەموو ئالنگارییەک دەرفەتێکی نوێیە."},
  {id: "e451", category: "success", original: "सफलता का कोई शार्टकट नहीं होता.", kurdish: "سەرکەوتن هیچ ڕێگەیەکی کورتی نییە."},
  {id: "e452", category: "mindset", original: "नकारात्मकता को दूर भगाओ.", kurdish: "بیری نەرێنی دوور بخەرەوە."},
  {id: "e453", category: "life", original: "जिंदगी नाम है आगे बढ़ते रहने का.", kurdish: "ژیان ناوی بەردەوام پێشڕەویکردنە."},
  {id: "e454", category: "patience", original: "धैर्य रखना सबसे बड़ी खूबी है.", kurdish: "ئارامگرتن گەورەترین سیفەتە."},
  {id: "e455", category: "hope", original: "आशा की किरण कभी नहीं बुझती.", kurdish: "تیشکی هیوا هەرگیز ناكوژێتەوە."},
  {id: "e456", category: "love", original: "सच्चा प्यार कभी नहीं बदलता.", kurdish: "خۆشەویستی ڕاستەقینە هەرگیز نگۆڕێت."},
  {id: "e457", category: "wisdom", original: "मूर्ख चुप रहे तो वह भी बुद्धिमान लगता है.", kurdish: "ئەگەر گەمژە بێدەنگ بێت ئەوا وەک زیرەک دەردەکەوێت."},
  {id: "e458", category: "growth", original: "हर दिन खुद का बेहतर वर्जन बनो.", kurdish: "هەموو ڕۆژێک بگوڕە بۆ وەشانێکی باشتر لە خۆت."},
  {id: "e459", category: "strength", original: "साहस से बड़ी कोई ढाल नहीं.", kurdish: "هیچ قەڵایەک لە بوێری گەورەتر نییە."},
  {id: "e460", category: "motivation", original: "अपनी ऊर्जा सही दिशा में लगाओ.", kurdish: "وزەکەت بخەرە سەر ڕێگە ڕاستەکە."},
  {id: "e461", category: "success", original: "मेहनत रंग लाती है.", kurdish: "ماندووبوون بەروبووم دەدات."},
  {id: "e462", category: "courage", original: "विपरीत परिस्थितियों में भी डटे रहो.", kurdish: "لە کاتی سەختیشدا سەرپشکو سەخت بمێنەوە."},
  {id: "e463", category: "life", original: "जिंदगी एक किताब की तरह है.", kurdish: "ژیان وەک کتێبێک وا بێت."},
  {id: "e464", category: "happiness", original: "संतोष ही सबसे बड़ा धन है.", kurdish: "ڕازیبوون گەورەترین دەوڵەمەندییە."},
  {id: "e465", category: "action", original: "समय का सदुपयोग करो.", kurdish: "کات بە شێوازێکی باش بەکاربهێنە."},
  {id: "e466", category: "dreams", original: "अपने सपनों पर पूरा भरोसा रखो.", kurdish: "باوەڕی تەواوت بە خەونەکانت هەبێت."},
  {id: "e467", category: "wisdom", original: "मीठी वाणी सबका दिल जीत लेती है.", kurdish: "قسەی شیرین دڵی هەمووان دەبردەوە."},
  {id: "e468", category: "perseverance", original: "लगातार लगे रहो, सफलता मिलेगी.", kurdish: "بەردەوام بە، سەرکەوتن بەدەست دێنیت."},
  {id: "e469", category: "hope", original: "सुबह के बाद सूरज जरूर उगता है.", kurdish: "دوای بەیانی بێگومان خۆر هەڵدێت."},
  {id: "e470", category: "motivation", original: "हार मत मानो, अभी खेल बाकी है.", kurdish: "کۆڵ مەدە، هێشتا یارییەکە ماوە."},
  {id: "e471", category: "success", original: "सोच बड़ी होगी तो सफलता भी बड़ी होगी.", kurdish: "ئەگەر بیرکردنەوە گەورە بێت، سەرکەوتنیش گەورە دەبێت."},
  {id: "e472", category: "mindset", original: "खुद पर काबू पाना ही सबसे बड़ी जीत है.", kurdish: "کۆنتڕۆڵکردنی خۆت گەورەترین سەرکەوتنە."},
  {id: "e473", category: "life", original: "हर मुस्कान के पीछे एक कहानी होती है.", kurdish: "لە پشت هەمە زەردەخەنەیەکەوە چیرۆکێک هەیە."},
  {id: "e474", category: "patience", original: "सब्र का फल महान होता है.", kurdish: "بەرەکەی ئارامگرتن مەزنە."},
  {id: "e475", category: "love", original: "प्रेम से बढ़कर कुछ नहीं.", kurdish: "هیچ شتێک لە خۆشەویستی بەرزتر نییە."},
  {id: "e476", category: "wisdom", original: "क्रोध मनुष्य का सबसे बड़ा शत्रु है.", kurdish: "تووڕەیی گەورەترین دوژمنی مرۆڤە."},
  {id: "e477", category: "growth", original: "गलतियों से ही इंसान सीखता है.", kurdish: "مرۆڤ تەنها لە هەڵەکانەوە فێر دەبێت."},
  {id: "e478", category: "strength", original: "मुश्किल समय में हिम्मत मत हारो.", kurdish: "لە کاتی سەختدا بوێریت لەدەست مەدە."},
  {id: "e479", category: "action", original: "आज का काम कल पर मत टालो.", kurdish: "کارەکەی ئەمڕۆ مەخە سبەی."},
  {id: "e480", category: "motivation", original: "अपनी मंजिल खुद तय करो.", kurdish: "ئامانجی خۆت خۆت دیاری بکە."},
  {id: "e481", category: "success", original: "सच्ची लगन से सब संभव है.", kurdish: "بە جۆش و خرۆشی ڕاستەقینە هەموو شتێک دەکرێت."},
  {id: "e482", category: "courage", original: "शेर की तरह जियो.", kurdish: "وەکو شێر بژی."},
  {id: "e483", category: "life", original: "जिंदगी बहुत खूबसूरत है.", kurdish: "ژیان زۆر جوانە."},
  {id: "e484", category: "happiness", original: "छोटी-छोटी बातों में खुशी ढूंढो.", kurdish: "دڵخۆشی لەناو شتە بچووکەکاندا بدۆزەوە."},
  {id: "e485", category: "dreams", original: "अपनी उड़ान खुद भरो.", kurdish: "فڕینی خۆت بە خۆت ئەنجام بدە."},
  {id: "e486", category: "wisdom", original: "अहकार पतन का कारण है.", kurdish: "خۆبەگەورەزانین هۆکاری کەوتنە."},
  {id: "e487", category: "perseverance", original: "धीमी चाल वाले भी मंजिल तक पहुँचते हैं.", kurdish: "ئەوانەشی خاو دەڕۆن دەگەنە ئامانج."},
  {id: "e488", category: "hope", original: "विश्वास रखो, सब ठीक होगा.", kurdish: "باوەڕت هەبێت، هەموو شتێک باش دەبێت."},
  {id: "e489", category: "love", original: "प्यार बांटने से बढ़ता है.", kurdish: "خۆشەویستی بە بەخشین زۆر دەبێت."},
  {id: "e490", category: "motivation", original: "कभी हार न मानने की आदत डालो.", kurdish: "خووی ئەوەت هەبێت کە هەرگیز کۆڵ نادەیت."},
  {id: "e491", category: "success", original: "मेहनती कभी असफल नहीं होता.", kurdish: "کەسی ماندووبوو هەرگیز شکست ناخوات."},
  {id: "e492", category: "mindset", original: "खुश रहना एक चुनाव है.", kurdish: "دڵخۆش بوون هەڵبژاردنێکە."},
  {id: "e493", category: "life", original: "समय अनमोल है, इसे बर्बाद मत करो.", kurdish: "کات بەنرخە، بەفیڕۆی مەدە."},
  {id: "e494", category: "patience", original: "धीरज से हर समस्या का हल निकलता है.", kurdish: "بە ئارامگرتن هەموو کێشەیەک چارەسەر دەبێت."},
  {id: "e495", category: "strength", original: "हौसला रखो, वक्त बदलते देर नहीं लगती.", kurdish: "باوەڕت بە خۆت هەبێت، کاتەکان زوو دەگۆڕێن."},
  {id: "e496", category: "dreams", original: "अपने सपनों को पंख दो.", kurdish: "باڵ بدە بە خەونەکانت."},
  {id: "e497", category: "wisdom", original: "क्षमा सबसे बड़ा गुण है.", kurdish: "لێخۆشبوون گەورەترین سیفەتە."},
  {id: "e498", category: "action", original: "कर्म ही पूजा है.", kurdish: "کردەوە پەرستنە."},
  {id: "e499", category: "hope", original: "उम्मीद की एक लौ काफी है.", kurdish: "تەنها تیشکێکی هیوا بەسە."},
  {id: "e500", category: "motivation", original: "तुम अपने भाग्य के रचयिता हो.", kurdish: "تۆ دروستکەری بەخت و چارەنووسی خۆتی."}
  ],

  japanese: [
    {id:"j1",category:"love",original:"君の笑顔が大好きです。",kurdish:"زۆر حەزم لە پێکەنینەکەتە."},
    {id:"j2",category:"love",original:"君といる時間は特別です。",kurdish:"کاتی بوونم لەگەڵ تۆ تایبەتە."},
    {id:"j3",category:"love",original:"心はいつも君を覚えています。",kurdish:"دڵم هەمیشە تۆی لەبیرە."},
    {id:"j4",category:"love",original:"君は私の小さな幸せです。",kurdish:"تۆ خۆشییە بچووکەکەی منیت."},
    {id:"j5",category:"love",original:"優しさは愛の言葉です。",kurdish:"میهرەبانی زمانی خۆشەویستییە."},
    {id:"j6",category:"love",original:"一緒なら普通の日も美しい。",kurdish:"ئەگەر پێکەوە بین، ڕۆژی ئاساییش جوانە."},
    {id:"j7",category:"love",original:"大切な人には心で話そう。",kurdish:"لەگەڵ کەسی گرنگدا بە دڵ قسە بکە."},
    {id:"j8",category:"love",original:"小さな思い出が宝物になる。",kurdish:"بیرەوەرییە بچووکەکان دەبنە گەنجینە."},
    {id:"j9",category:"love",original:"君の幸せを願っています。",kurdish:"هیوادارم خۆش بیت."},
    {id:"j10",category:"love",original:"本当の愛には尊敬がある。",kurdish:"لە خۆشەویستیی ڕاستەقینەدا ڕێزگرتن هەیە."},
    {id:"j11",category:"sad",original:"沈黙にも気持ちがある。",kurdish:"بێدەنگیش هەستی هەیە."},
    {id:"j12",category:"sad",original:"思い出は心に残る。",kurdish:"بیرەوەرییەکان لە دڵدا دەمێننەوە."},
    {id:"j13",category:"sad",original:"寂しさは静かに訪れる。",kurdish:"دڵتەنگی بە بێدەنگی دێت."},
    {id:"j14",category:"sad",original:"時間が心を癒してくれる。",kurdish:"کات دڵ چاک دەکاتەوە."},
    {id:"j15",category:"sad",original:"離れていても忘れない。",kurdish:"تەنانەت لە دووریشدا لەبیر ناکەم."},
    {id:"j16",category:"sad",original:"悲しい日もいつか過ぎる。",kurdish:"ڕۆژە خەمگینەکانیش ڕۆژێک تێدەپەڕن."},
    {id:"j17",category:"life",original:"毎日は新しいチャンスです。",kurdish:"هەر ڕۆژێک دەرفەتێکی نوێیە."},
    {id:"j18",category:"life",original:"小さな幸せを大切にしよう。",kurdish:"گرنگی بە خۆشییە بچووکەکان بدە."},
    {id:"j19",category:"life",original:"ゆっくりでも前に進める。",kurdish:"تەنانەت بە هێواشییش دەتوانیت بەرەو پێش بچیت."},
    {id:"j20",category:"life",original:"心の平和は大切です。",kurdish:"ئارامی دڵ گرنگە."},
    {id:"j21",category:"motivation",original:"自分の道を信じて。",kurdish:"باوەڕ بە ڕێگای خۆت بکە."},
    {id:"j22",category:"motivation",original:"失敗は学びの一部です。",kurdish:"شکست بەشێکە لە فێربوون."},
    {id:"j23",category:"motivation",original:"小さな一歩を大切に。",kurdish:"گرنگی بە هەنگاوی بچووک بدە."},
    {id:"j24",category:"motivation",original:"あなたには成長する力がある。",kurdish:"تۆ توانای گەشەکردنت هەیە."},
    {id:"j25",category:"motivation",original:"新しい始まりを恐れないで。",kurdish:"لە دەستپێکردنی نوێ مەترسە."},
    {id: "c101", category: "motivation", original: "千里之行，始于足下。", kurdish: "گەشتی هەزار میل بە یەک هەنگاو دەست پێدەکات."},
{id: "c102", category: "life", original: "人生如梦，岁月 留痕。", kurdish: "ژیان وەک خەونێک وایە و تەمەن شوێنپێی خۆی جێدەهێڵێت."},
{id: "c103", category: "love", original: " You are my forever and always.", kurdish: "تۆ هەمیشە و بۆ هەتایە هی منی."},
{id: "c104", category: "sad", original: "黯然 C伤，莫过于心死。", kurdish: "خەمناکترین شت مردنی دڵە."},
{id: "c105", category: "motivation", original: "世上无难事，只怕有心人。", kurdish: "هیچ شتێک لە جیهاندا مەحاڵ نییە، تەنها ترسی ئەوە نەبێت کە دڵت نەبێت."},
{id: "c106", category: "life", original: "时间就是金钱。", kurdish: "کات زێڕە."},
{id: "c107", category: "love", original: "我爱你胜过一切。", kurdish: "زیاتر لە هەموو شتێک خۆشم دەوێیت."},
{id: "c108", category: "sad", original: "孤独是一种无声的痛。", kurdish: "تەنهایی جۆرێکە لە ئازاری بێدەنگ."},
{id: "c109", category: "motivation", original: "坚持就是胜利。", kurdish: "بەردەوامبوون خۆی لە خۆیدا سەرکەوتنە."},
{id: "c110", category: "life", original: "吃一堑，长一智。", kurdish: "لە هەر هەڵەیەکدا وانەیەک فێر دەبی."},
{id: "c111", category: "love", original: "有你的地方就是天堂。", kurdish: "ئەو شوێنەی تو تێیدایت بەهەشتە."},
{id: "c112", category: "sad", original: "眼泪是心灵的语言。", kurdish: "فرمێسک زمانی ڕۆحە."},
{id: "c113", category: "motivation", original: "命运掌握在自己手中。", kurdish: "چارەنووس لە دەستی خۆتدایە."},
{id: "c114", category: "life", original: "笑一笑，十年少。", kurdish: "پێکەنینێک دە ساڵ گەنجت دەکاتەوە."},
{id: "c115", category: "love", original: "愿得一人心，白首不相离。", kurdish: "با دڵی یەکێک دەستنیشان بکەین و تا پیری لێک جیا نەبینەوە."},
{id: "c116", category: "sad", original: "物是人非事事休。", kurdish: "شتەکان دەگۆڕێن و مرۆڤەکان دەڕۆن و هەموو شتێک کۆتایی دێت."},
{id: "c117", category: "motivation", original: "失败乃成功之母。", kurdish: "شکست دایکی سەرکەوتنە."},
{id: "c118", category: "life", original: "路遥知马力，日久见人心。", kurdish: "ڕێگای دوور هێزی ئەسپ دەردەخات، کاتیش مرۆڤەکان دەردەخات."},
{id: "c119", category: "love", original: "你是我的唯一。", kurdish: "تۆ تەنها کەسی منی."},
{id: "c120", category: "sad", original: "相思苦，苦相思。", kurdish: "ئازاری دووری تاڵە، بیری یەکترکردن تاڵە."},
{id: "c121", category: "motivation", original: "少壮不努力，老大徒伤悲。", kurdish: "ئەگەر لە گەنجیدا هەوڵ نەدەیت، لە پیریدا پەشیمان دەبیتەوە."},
{id: "c122", category: "life", original: "既来之，则安之。", kurdish: "کاتێک گەیشتیتە شوێنێک، ئارام بگرە و قبوڵی بکە."},
{id: "c123", category: "love", original: "心心相印，情深意重。", kurdish: "دڵەکان پێکەوە گرێ دراون و خۆشەویستی قوڵە."},
{id: "c124", category: "sad", original: "聚散皆是缘，离别总关情。", kurdish: "کۆبوونەوە و دابڕان هەردووکیان چارەنووسن، جیابوونەوەش هەمیشە خەمی لەپشتە."},
{id: "c125", category: "motivation", original: "宝剑锋从磨砺出。", kurdish: "شمشێری تیژ لە ئەنجامی ڕووتبوونەوە و تاشین دروست دەبێت."},
  {id: "e501", category: "motivation", original: "七転び八起き", kurdish: "حەوت جار بکەوە، هەشت جار هەستەوە."},
  {id: "e502", category: "success", original: "継続は力なり", kurdish: "بەردەوامی هێزە."},
  {id: "e503", category: "life", original: "人生は一度きり", kurdish: "ژیان تەنها یەک جارە."},
  {id: "e504", category: "mindset", original: "初心忘るべからず", kurdish: "نیت و بیرۆکەی سەرەتاتێی خۆت هەرگیز لەبیر مەکە."},
  {id: "e505", category: "dreams", original: "夢は逃げない、逃げるのはいつも自分だ", kurdish: "خەونەکان ڕاکردن ناکەن، ئەوەی دەڕەوێتەوە هەمیشە خۆتی."},
  {id: "e506", category: "action", original: "思い立ったが吉日", kurdish: "هەر کاتێک بیری لێکردیتەوە، باشترین ڕۆژە بۆ دەستپێکردن."},
  {id: "e507", category: "happiness", original: "笑う門には福来たる", kurdish: "بەخت دێتە ئەو ماڵەی کە پێکەنینی تێدایە."},
  {id: "e508", category: "perseverance", original: "石の上にも三年", kurdish: "تەنانەت لەسەر بەردێکیش دانیشیت بۆ سێ ساڵ، سەرکەوتوو دەبیت (بەرگەگرتن)."},
  {id: "e509", category: "growth", original: "日日是好日", kurdish: "هەموو ڕۆژێک ڕۆژێکی باشە."},
  {id: "e510", category: "strength", original: "ピンチはチャンス", kurdish: "ناخۆشی و تەنگژە دەرفەتە."},
  {id: "e511", category: "wisdom", original: "知るは一時の恥、知らぬは一生の恥", kurdish: "پرسیارکردن شەرمە بۆ ساتێک، نەزانین شەرمە بۆ هەموو تەمەن."},
  {id: "e512", category: "motivation", original: "千里の道も一歩から", kurdish: "ڕێگەی هەزار میلیش بە یەک هەنگاو دەستپێدەکات."},
  {id: "e513", category: "positivity", original: "雨降って地固まる", kurdish: "لە دوای باران بارین زەوی ڕەقتر دەبێت."},
  {id: "e514", category: "life", original: "花鳥風月", kurdish: "چێژ لە جوانییەکانی سروشت و ژیان وەربگرە."},
  {id: "e515", category: "success", original: "失敗は成功のもと", kurdish: "شکست بناغەی سەرکەوتنە."},
  {id: "e516", category: "courage", original: "虎穴に入らずんば虎児を得ず", kurdish: "تا ناچیتە ناو ئەشکەوتی پڵنگەوە، بێچووەکەی ناڕفێنیت (بوێریت دەوێت)."},
  {id: "e517", category: "action", original: "百聞は一見にしかず", kurdish: "بیستن وەک بینین وا نییە (بینین سەد هێندەی بیستنە)."},
  {id: "e518", category: "patience", original: "忍耐は苦いが、その実はおいしい", kurdish: "ئارامگرتن تاڵە، بەڵام بەرەکەی شیرینە."},
  {id: "e519", category: "hope", original: "明日は明日の風が吹く", kurdish: "سبەی بای خۆی هەڵدەکات (ئومێد هەمیشە هەیە)."},
  {id: "e520", category: "love", original: "愛は勝つ", kurdish: "خۆشەویستی سەرکەوتوو دەبێت."},
  {id: "e521", category: "motivation", original: "やればできる", kurdish: "ئەگەر هەوڵ بدەیت، دەتوانیت."},
  {id: "e522", category: "success", original: "塵も積もれば山となる", kurdish: "تەنانەت تۆزیش ئەگەر کۆببێتەوە دەبێتە چیا."},
  {id: "e523", category: "mindset", original: "一期一会", kurdish: "هەموو ساتێک لە ژیاندا تەنها یەک جار ڕوودەدات، گرنگی پێبدە."},
  {id: "e524", category: "life", original: "人生意気に感じ", kurdish: "ژیان بە پەرۆشی و خۆشەویستییەوە دەژی."},
  {id: "e525", category: "happiness", original: "足るを知る", kurdish: "بەخشندەیی و ڕازیبوون بەوەی هەتە سەرچاوەی دڵخۆشییە."},
  {id: "e526", category: "wisdom", original: "光陰矢の如し", kurdish: "کات وەک تیر خێرا دەڕوات."},
  {id: "e527", category: "growth", original: "温故知新", kurdish: "لە ڕابردوو فێربە بۆ ئەوەی داهاتوو دروست بکەیت."},
  {id: "e528", category: "perseverance", original: "我武者羅", kurdish: "بە تەواوی هێز و بەبێ کۆڵدان کار بکە."},
  {id: "e529", category: "dreams", original: "夢を叶える", kurdish: "خەونەکانت بهێنەدی."},
  {id: "e530", category: "strength", original: "逆境に負けるな", kurdish: "لە بەرامبەر ناخۆشیدا مروۆڤ مەبە."},
  {id: "e531", category: "motivation", original: "明日やろうは馬鹿野郎", kurdish: "ئەو کەسەی کارەکەی دەخاتە سبەی گەمژەیە (ئێستا بکە)."},
  {id: "e532", category: "success", original: "為せば成る", kurdish: "هەر شتێک بکەیت دەبێتە ڕاستی (ئەگەر هەوڵ بدەیت)."},
  {id: "e533", category: "courage", original: "勇気を出して", kurdish: "بوێری پەیدا بکە."},
  {id: "e534", category: "life", original: "自然体でいこう", kurdish: "بە سروشتی خۆت بژی و خۆت مەگۆڕە."},
  {id: "e535", category: "happiness", original: "心頭を滅すれば火もまた涼し", kurdish: "ئەگەر مێشکت ئارام بێت، تەنانەت ئاگرەکەی هاوینیش فێنکە."},
  {id: "e536", category: "mindset", original: "自業自得", kurdish: "هەرچتێک چێنیت ئەوە دەدووریتەوە (ئاکامی کردەوە)."},
  {id: "e537", category: "strength", original: "七転八起の精神", kurdish: "گیانی حەوت جار کەوتن و هەشت جار هەستانەوە."},
  {id: "e538", category: "dreams", original: "夢に向かって", kurdish: "بەرەو لای خەونەکانت هەنگاو بنێ."},
  {id: "e539", category: "wisdom", original: "備えあれば憂いなし", kurdish: "ئامادەکاری پێشوەختە نیگەرانی کەم دەکاتەوە."},
  {id: "e540", category: "action", original: "思い立ったが吉日", kurdish: "ڕۆژی باشترین کاتە بۆ کارکردن ئەو کاتەیە کە بە خەیاڵتدا دێت."},
  {id: "e541", category: "motivation", original: "頑張って", kurdish: "بەردەوام بە و کۆڵ مەدە (کاوراباری)."},
  {id: "e542", category: "success", original: "努力は報われる", kurdish: "ماندووبوون پاداشت دەکرێت."},
  {id: "e543", category: "life", original: "一歩ずつ", kurdish: "هەنگاو بە هەنگاو."},
  {id: "e544", category: "happiness", original: "平穏な日々", kurdish: "ڕۆژانی ئارام و بێ کێشە."},
  {id: "e545", category: "patience", original: "耐えて勝つ", kurdish: "بە بەرگەگرتن دەتوانیت ببەیتەوە."},
  {id: "e546", category: "hope", original: "希望を持つ", kurdish: "هیوات هەبێت."},
  {id: "e547", category: "love", original: "愛を込めて", kurdish: "بە خۆشەویستییەوە."},
  {id: "e548", category: "growth", original: "日々成長", kurdish: "هەموو ڕۆژێک گەشەکردن."},
  {id: "e549", category: "wisdom", original: "急がば回れ", kurdish: "پەلە مەکە، هەندێک جار ڕێگەی درێژ سەلامەتترە."},
  {id: "e550", category: "motivation", original: "自分を信じて", kurdish: "باوەڕت بە خۆت هەبێت."},
  {id: "e551", category: "success", original: "継続は一番の近道", kurdish: "بەردەوامبوون کورتترین ڕێگەیە بۆ سەرکەوتن."},
  {id: "e552", category: "courage", original: "一歩を踏み出す", kurdish: "یەکەم هەنگاو بنێ."},
  {id: "e553", category: "life", original: "今を生きる", kurdish: "لە ئێستادا بژی."},
  {id: "e554", category: "happiness", original: "笑顔が一番", kurdish: "زەردەخەنە لە هەموو شتێک گرنگترە."},
  {id: "e555", category: "strength", original: "強い心を持つ", kurdish: "دڵێکی بەهێزت هەبێت."},
  {id: "e556", category: "dreams", original: "夢を諦めない", kurdish: "لە خەونەکانت مەلەرزە (کۆڵ مەدە)."},
  {id: "e557", category: "mindset", original: "前向きに生きる", kurdish: "بە تێڕوانینێکی ئەرێنیانە بژی."},
  {id: "e558", category: "action", original: "すぐに行動する", kurdish: "ڕاستەوخۆ کار بکە."},
  {id: "e559", category: "wisdom", original: "良薬は口に苦し", kurdish: "دەرمانی باش تاڵە (ئامۆژگاری ڕاست ڕەقە)."},
  {id: "e560", category: "motivation", original: "諦めない心", kurdish: "ئەو دڵەی کە هەرگیز کۆڵ نادات."},
  {id: "e561", category: "success", original: "果報は寝て待て", kurdish: "کارەکانت بکە و بەختت لە خەودا بەدەست بهێنە (ئارام بگرە)."},
  {id: "e562", category: "perseverance", original: "最後までやり抜く", kurdish: "تا کۆتایی بەردەوام بە."},
  {id: "e563", category: "life", original: "道を楽しむ", kurdish: "چێژ لە خودی ڕێگاکە وەربگرە."},
  {id: "e564", category: "happiness", original: "心に余裕を", kurdish: "ئارامی بدە بە مێشکت."},
  {id: "e565", category: "strength", original: "負けず嫌い", kurdish: "ئەو کەسەی قبووڵی دۆڕان ناکات."},
  {id: "e566", category: "hope", original: "明日はもっと良い日", kurdish: "سبەی ڕۆژێکی زۆر باشتر دەبێت."},
  {id: "e567", category: "love", original: "心をつなぐ", kurdish: "پەیوەندیکردن لەگەڵ دڵەکاندا."},
  {id: "e568", category: "growth", original: "昨日の自分を超える", kurdish: "لە خۆی دوێنێت تێپەڕە."},
  {id: "e569", category: "wisdom", original: "知恵をしぼる", kurdish: "زیرەکی و تواناکانی خۆت بەکاربهێنە."},
  {id: "e570", category: "motivation", original: "情熱を持って", kurdish: "بە خرۆش و گەرماوەوە."},
  {id: "e571", category: "success", original: "勝利の女神", kurdish: "خودای سەرکەوتن لەگەڵ کەسی ماندووبوودایە."},
  {id: "e572", category: "courage", original: "壁を乗り越える", kurdish: "دیوارەکان و بەربەستەکان ببڕە."},
  {id: "e573", category: "life", original: "自分らしく", kurdish: "وەکو خۆت بمێنەوە (ڕەسەن بە)."},
  {id: "e574", category: "happiness", original: "小さな幸せ", kurdish: "دڵخۆشییە بچووکەکان."},
  {id: "e575", category: "mindset", original: "平常心を保つ", kurdish: "ئارامی و هاوسەنگی دەروونی خۆت بپارێزە."},
  {id: "e576", category: "dreams", original: "夢に向かって走る", kurdish: "بەرەو لای خەونەکانت ڕابکە."},
  {id: "e577", category: "action", original: "一歩前へ", kurdish: "یەک هەنگاو بەرەو پێشەوە."},
  {id: "e578", category: "patience", original: "じっと耐える", kurdish: "بەرگەگرتنی هێمنانە."},
  {id: "e579", category: "hope", original: "光に向かって", kurdish: "بەرەو لای ڕووناکی."},
  {id: "e580", category: "motivation", original: "限界を超える", kurdish: "لە سنوورەکانت تێپەڕە."},
  {id: "e581", category: "success", original: "努力の成果", kurdish: "بەروبوومی ماندووبوون."},
  {id: "e582", category: "growth", original: "進化し続ける", kurdish: "بەردەوام لە گەشەسەندندا بە."},
  {id: "e583", category: "wisdom", original: "温故知新の精神", kurdish: "گیانی سوودوەرگرتن لە ڕابردوو."},
  {id: "e584", category: "strength", original: "折れない心", kurdish: "ئەو دڵەی کە هەرگیز ناشکێت."},
  {id: "e585", category: "life", original: "命を大切に", kurdish: "نرخ بۆ ژیان دابنێ."},
  {id: "e586", category: "happiness", original: "感謝の気持ち", kurdish: "هەستی سوپاسگوزاری."},
  {id: "e587", category: "courage", original: "困難に立ち向かう", kurdish: "ڕووبەڕووبوونەوەی سەختییەکان."},
  {id: "e588", category: "dreams", original: "夢を実現する", kurdish: "بەدیهێنانی خەونەکان."},
  {id: "e589", category: "action", original: "今すぐ動く", kurdish: "ئێستا بجووڵێ."},
  {id: "e590", category: "motivation", original: "未来を創る", kurdish: "دروستکردنی داهاتوو."},
  {id: "e591", category: "success", original: "栄光をつかむ", kurdish: "دەستت بگاتە شکۆمەندی."},
  {id: "e592", category: "mindset", original: "心を磨く", kurdish: "دەروون و مێشکت پاک و ڕووناک بکەرەوە."},
  {id: "e593", category: "patience", original: "石の上にも", kurdish: "سەبر و تەحەمول لەسەر هەموو شتێک."},
  {id: "e594", category: "hope", original: "未来は明るい", kurdish: "داهاتوو گەشە."},
  {id: "e595", category: "love", original: "永遠の愛", kurdish: "خۆشەویستی هەمیشەیی."},
  {id: "e596", category: "growth", original: "日々精進", kurdish: "هەموو ڕۆژێک هەوڵی زیاتر."},
  {id: "e597", category: "wisdom", original: "経験が宝", kurdish: "ئەزموون گەنجینەیە."},
  {id: "e598", category: "strength", original: "不屈の精神", kurdish: "گیانی پڕ لە بەرگەگرتن و کۆڵنەدان."},
  {id: "e599", category: "action", original: "有言実行", kurdish: "قسەکەت بکە بە کردار (کردنی ئەوەی دەیڵێیت)."},
  {id: "e600", category: "motivation", original: "人生の主役は自分", kurdish: "پاڵەوانی سەرەکی ژیانت تەنها خۆتی."}
  ],

  french: [
    {id:"f1",category:"love",original:"Tu es mon plus beau hasard.",kurdish:"تۆ جوانترین ڕووداوی نەچاوەڕوانکراوی منیت."},
    {id:"f2",category:"love",original:"Ton sourire illumine mes journées.",kurdish:"پێکەنینەکەت ڕۆژەکانم ڕووناک دەکاتەوە."},
    {id:"f3",category:"love",original:"Certains cœurs se comprennent sans mots.",kurdish:"هەندێک دڵ بەبێ وشە لە یەکتر تێدەگەن."},
    {id:"f4",category:"love",original:"Avec toi, les petits moments deviennent précieux.",kurdish:"لەگەڵ تۆدا ساتە بچووکەکان بە نرخ دەبن."},
    {id:"f5",category:"love",original:"La tendresse parle plus fort que les mots.",kurdish:"میهرەبانی لە وشە بەهێزتر قسە دەکات."},
    {id:"f6",category:"love",original:"Ton bonheur compte pour moi.",kurdish:"خۆشیی تۆ لام گرنگە."},
    {id:"f7",category:"love",original:"Les plus beaux souvenirs sont simples.",kurdish:"جوانترین بیرەوەرییەکان سادەن."},
    {id:"f8",category:"love",original:"Le respect rend l'amour plus fort.",kurdish:"ڕێزگرتن خۆشەویستی بەهێزتر دەکات."},
    {id:"f9",category:"love",original:"Tu apportes du calme à mon monde.",kurdish:"تۆ ئارامی دەهێنیتە جیهانی من."},
    {id:"f10",category:"love",original:"L'amour sincère laisse de la place à la confiance.",kurdish:"خۆشەویستیی ڕاستگۆیانە شوێن بۆ متمانە دەهێڵێتەوە."},
    {id:"f11",category:"sad",original:"Le silence cache parfois beaucoup de sentiments.",kurdish:"بێدەنگی هەندێک جار هەستێکی زۆر دەشارێتەوە."},
    {id:"f12",category:"sad",original:"Le manque se glisse dans les jours ordinaires.",kurdish:"دڵتەنگی بە نهێنی دەچێتە ناو ڕۆژە ئاساییەکان."},
    {id:"f13",category:"sad",original:"Certaines paroles arrivent trop tard.",kurdish:"هەندێک قسە زۆر درەنگ دەگەن."},
    {id:"f14",category:"sad",original:"Les souvenirs restent quand le temps passe.",kurdish:"بیرەوەرییەکان دەمێننەوە کاتێک کات تێدەپەڕێت."},
    {id:"f15",category:"sad",original:"Le cœur a besoin de repos lui aussi.",kurdish:"دڵیش پێویستی بە پشوودانە."},
    {id:"f16",category:"sad",original:"La tristesse ne dure pas toujours.",kurdish:"خەم هەمیشە بەردەوام نابێت."},
    {id:"f17",category:"life",original:"Chaque jour apporte une nouvelle chance.",kurdish:"هەر ڕۆژێک دەرفەتێکی نوێ دەهێنێت."},
    {id:"f18",category:"life",original:"Les petits bonheurs rendent la vie belle.",kurdish:"خۆشییە بچووکەکان ژیان جوان دەکەن."},
    {id:"f19",category:"life",original:"La paix intérieure est une richesse.",kurdish:"ئارامی ناوەوە گەنجینەیە."},
    {id:"f20",category:"life",original:"Apprends à apprécier le présent.",kurdish:"فێر بە گرنگی بە ئێستا بدەیت."},
    {id:"f21",category:"motivation",original:"Avance à ton propre rythme.",kurdish:"بە خێرایی خۆت بەرەو پێش بچۆ."},
    {id:"f22",category:"motivation",original:"Chaque erreur peut enseigner quelque chose.",kurdish:"هەر هەڵەیەک دەتوانێت شتێک فێرت بکات."},
    {id:"f23",category:"motivation",original:"Crois en tes petits progrès.",kurdish:"باوەڕ بە پێشکەوتنە بچووکەکانت بکە."},
    {id:"f24",category:"motivation",original:"Tu peux toujours recommencer.",kurdish:"هەمیشە دەتوانیت دووبارە دەست پێ بکەیتەوە."},
    {id:"f25",category:"motivation",original:"Ton avenir peut être plein de possibilités.",kurdish:"داهاتووت دەتوانێت پڕ بێت لە دەرفەت."},
     {id: "f101", category: "motivation", original: "Vouloir, c'est pouvoir.", kurdish: "ویستن، توانینە."},
{id: "f102", category: "life", original: "La vie est un long fleuve tranquille.", kurdish: "ژیان ڕووبارێکی درێژ و ئارامە."},
{id: "f103", category: "love", original: "L'amour ne se voit pas avec les yeux, mais avec l'âme.", kurdish: "خۆشەویستی بە چاو نابینرێت، بەڵکو بە ڕۆح دەبینرێت."},
{id: "f104", category: "sad", original: "Il n'y a point de pire eau que l'eau qui dort.", kurdish: "هیچ ئاوێک خراپتر نییە لەو ئاوەی کە بێدەنگە."},
{id: "f105", category: "motivation", original: "Après la pluie, le beau temps.", kurdish: "لەدوای باران بارین، کەشوهەوای جوان دێت."},
{id: "f106", category: "life", original: "Petit à petit, l'oiseau fait son nid.", kurdish: "پارچە پارچە، پەلەوەر هێلانەکەی دروست دەکات."},
{id: "f107", category: "love", original: "Tu es mon soleil au milieu de la nuit.", kurdish: "تۆ خۆری منی لە ناوەڕاستی تاریکی شەوەکەدا."},
{id: "f108", category: "sad", original: "Les larmes sont les mots que le cœur ne peut pas dire.", kurdish: "فرمێسک ئەو قسەیەن کە دڵ ناتوانێت دەریانبڕێت."},
{id: "f109", category: "motivation", original: "Rien n'est impossible à qui sait attendre.", kurdish: "هیچ شتێک مەحاڵ نییە بۆ ئەوەی کە دەزانێت چۆن چاوەڕێ بکات."},
{id: "f110", category: "life", original: "Chaque jour est une nouvelle chance.", kurdish: "هەموو ڕۆژێک دەرفەتێکی نوێیە."},
{id: "f111", category: "love", original: "Mon cœur t'appartient pour toujours.", kurdish: "دڵم بۆ هەمیشە هی تویە."},
{id: "f112", category: "sad", original: "Le silence est parfois la pire des réponses.", kurdish: "بێدەنگی هەندێک جار خراپترین وەڵامە."},
{id: "f113", category: "motivation", original: "Il ne faut jamais remettre au lendemain ce qu'on peut faire aujourd'hui.", kurdish: "هەرگیز ئەو کارەی کە دەتوانیت ئەمڕۆ بکەی، خەنی مەخە بۆ سبەی."},
{id: "f114", category: "life", original: "L'espoir fait vivre.", kurdish: "هیوایە کە مرۆڤ دەژێنێت."},
{id: "f115", category: "love", original: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.", kurdish: "خۆشەویستی سه‌یرکردنی یەکتر نییە، بەڵکو سه‌یرکردنی ئاراستەیەکی هاوبەشە."},
{id: "f116", category: "sad", original: "Le bonheur est parfois caché dans les souvenirs.", kurdish: "خۆشی هەندێک جار لەناو یادەوەرییەکاندا شاردراوەتەوە."},
{id: "f117", category: "motivation", original: "Sois le changement que tu veux voir dans le monde.", kurdish: "بە ئەو گۆڕانکارییەی کە دەتەوێت لە جیهاندا بینی."},
{id: "f118", category: "life", original: "Le temps guérit toutes les blessures.", kurdish: "کات هەموو برینەکان سارێژ دەکات."},
{id: "f119", category: "love", original: "Tu es la plus belle chose qui m'est arrivée.", kurdish: "تۆ جوانترین شتی کە بەسەر مندا هاتبێت."},
{id: "f120", category: "sad", original: "Il est difficile d'oublier quelqu'un qui nous a donné tant de souvenirs.", kurdish: "قورسە فەرامۆشکردنی ئەو کەسەی یادەوەری زۆری پێبەخشیووین."},
{id: "f121", category: "motivation", original: "Chaque échec est un pas vers le succès.", kurdish: "هەموو شکستێک هەنگاوێکە بەرەو سەرکەوتن."},
{id: "f122", category: "life", original: "La patience est amère, mais son fruit est doux.", kurdish: "ئارامگرتن تاڵە، بەڵام بەرەکەی شیرینە."},
{id: "f123", category: "love", original: "Je t'aime plus qu'hier et moins que demain.", kurdish: "لە دوێنێ خۆشترت دەوێم و لە سبەی کەمتر."},
{id: "f124", category: "sad", original: "La solitude pèse lourd sur le cœur.", kurdish: "تەنهایی باری قورسە لەسەر دڵ."},
{id: "f125", category: "motivation", original: "Ne baisse jamais les bras.", kurdish: "هەرگیز دەستبەردار مەبە."},
  {id: "e601", category: "motivation", original: "Petit à petit, l'oiseau fait son nid.", kurdish: "هێدی هێدی، باڵندە هێلانەکەی دروست دەکات."},
  {id: "e602", category: "success", original: "Vouloir, c'est pouvoir.", kurdish: "ویستن، توانینە."},
  {id: "e603", category: "life", original: "La vie est belle.", kurdish: "ژیان جوانە."},
  {id: "e604", category: "mindset", original: "Chaque jour est un nouveau départ.", kurdish: "هەموو ڕۆژێک دەستپێکێکی نوێیە."},
  {id: "e605", category: "dreams", original: "Fais de ta vie un rêve, et d'un rêve, une réalité.", kurdish: "ژیانت بکە بە خەونێک، و خەونێکیش بکە بە ڕاستی."},
  {id: "e606", category: "action", original: "Il n'est jamais trop tard pour bien faire.", kurdish: "هەرگیز زوو یان دیر نییە بۆ ئەوەی کارێکی باش بکەیت."},
  {id: "e607", category: "happiness", original: "Le bonheur est la seule chose qui se double si on la partage.", kurdish: "دڵخۆشی تەنها شتێکە کە دووبەرامبەر دەبێت ئەگەر دابەشی بکەیت."},
  {id: "e608", category: "perseverance", original: "Après la pluie, le beau temps.", kurdish: "لە دوای باران، کەشوهەوای جوان دێت (لە دوای ناخۆشی خۆشی دێت)."},
  {id: "e609", category: "growth", original: "On apprend de ses erreurs.", kurdish: "مرۆڤ لە هەڵەکانی خۆیەوە فێر دەبێت."},
  {id: "e610", category: "strength", original: "Ce qui ne nous tue pas nous rend plus forts.", kurdish: "ئەوەی نەمانکوژێت، بەهێزترمان دەکات."},
  {id: "e611", category: "wisdom", original: "Qui cherche trouve.", kurdish: "ئەوەی بگەڕێت دەدۆزێتەوە."},
  {id: "e612", category: "motivation", original: "Impossible n'est pas français.", kurdish: "مەحاڵ بوونی نییە (ئەگەر ئیرادە هەبێت)."},
  {id: "e613", category: "positivity", original: "Gardez le sourire.", kurdish: "زەردەخەنەکەت بپارێزە."},
  {id: "e614", category: "life", original: "La vie est un mystère qu'il faut vivre, non un problème à résoudre.", kurdish: "ژیان ڕازێکە دەبێت بژیرێت، نەک کێشەیەک بۆ چارەسەرکردن."},
  {id: "e615", category: "success", original: "Le succès est au bout de l'effort.", kurdish: "سەرکەوتن لە کۆتایی ماندووبووندایە."},
  {id: "e616", category: "courage", original: "L'audace a du génie, du pouvoir et de la magie.", kurdish: "بوێری خاوەن بەهرە، هێز و سیحرە."},
  {id: "e617", category: "action", original: "Les actes parlent plus fort que les mots.", kurdish: "کردەوەکان لە قسەکان بەدەنگتر قسە دەکەن."},
  {id: "e618", category: "patience", original: "Tout vient à point à qui sait attendre.", kurdish: "هەموو شتێک لە کاتی خۆیدا دێت بۆ کەسێک کە بزانێت چۆن چاوەڕێ بکات."},
  {id: "e619", category: "hope", original: "Tant qu'il y a de la vie, il y a de l'espoir.", kurdish: "تاکو ژیان هەبێت، هیواش هەیە."},
  {id: "e620", category: "love", original: "Aimer, c'est savoir dire je t'aime sans parler.", kurdish: "خۆشویستن ئەوەیە بتوانیت بڵێیت خۆشم دەوێیت بێ ئەوەی قسە بکەیت."},
  {id: "e621", category: "motivation", original: "Crois en tes rêves et ils se réaliseront peut-être.", kurdish: "باوەڕت بە خەونەکانت هەبێت و ڕەنگە بێنە دی."},
  {id: "e622", category: "success", original: "La réussite appartient à ceux qui se lève tôt.", kurdish: "سەرکەوتن بۆ ئەوانەیە کە زوو هەڵدەستن."},
  {id: "e623", category: "mindset", original: "Pense positif et attire le positif.", kurdish: "ئەرێنی بیربکەرەوە و شتی ئەرێنی ڕابکێشە."},
  {id: "e624", category: "life", original: "Profite de chaque instant.", kurdish: "چێژ لە هەموو ساتێک وەربگرە."},
  {id: "e625", category: "happiness", original: "Le vrai bonheur ne coûte rien.", kurdish: "دڵخۆشی ڕاستەقینە هیچ تێچوویەکی نییە."},
  {id: "e626", category: "wisdom", original: "Le savoir est une richesse qui ne se vole pas.", kurdish: "زانین سەروەتێکە کە نادزرێت."},
  {id: "e627", category: "growth", original: "Grandir, c'est apprendre à se connaître.", kurdish: "گەشەکردن ئەوەیە فێربێت خۆت بناسیت."},
  {id: "e628", category: "perseverance", original: "La persévérance vient à bout de tout.", kurdish: "بەردەوامی بەسەر هەموو شتێکدا زاڵ دەبێت."},
  {id: "e629", category: "dreams", original: "Ne rêve pas ta vie, vis tes rêves.", kurdish: "خەون بە ژیانتەوە مەبینە، بەڵکو خەونەکانت بژی."},
  {id: "e630", category: "strength", original: "La force intérieure est la plus grande des armes.", kurdish: "هێزی ناوەوە گەورەترین چەکە."},
  {id: "e631", category: "motivation", original: "Chaque effort compte.", kurdish: "هەموو ماندووبوونێک هەژمار دەکرێت."},
  {id: "e632", category: "success", original: "Le secret du succès est la constance du but.", kurdish: "نهێنی سەرکەوتن بەردەوامییە لەسەر ئامانج."},
  {id: "e633", category: "courage", original: "Le courage, c'est d'aller à l'idéal et de comprendre le réel.", kurdish: "بوێری ئەوەیە بەرەو شتە بەرزەکان بڕۆیت و تێبگەیت لە ڕاستییەکان."},
  {id: "e634", category: "life", original: "La vie est courte, cours après tes rêves.", kurdish: "ژیان کورتە، ڕابکە بەدوای خەونەکانتدا."},
  {id: "e635", category: "happiness", original: "Sois heureux pour ce moment. Ce moment est ta vie.", kurdish: "دڵخۆش بە بۆ ئەم ساتە. ئەم ساتە ژیانی تۆیە."},
  {id: "e636", category: "mindset", original: "Change tes pensées et tu changeras ton monde.", kurdish: "بیرکردنەوەکانت بگۆڕە و جیهانەکەت دەگۆڕێت."},
  {id: "e637", category: "strength", original: "Un cœur fort surmonte tous les obstacles.", kurdish: "دڵێکی بەهێز بەسەر هەموو بەربەستەکاندا سەرکەوتوو دەبێت."},
  {id: "e638", category: "dreams", original: "Vis pour tes rêves, pas pour ceux des autres.", kurdish: "بۆ خەونەکانی خۆت بژی، نەک خەونی کەسانی تر."},
  {id: "e639", category: "wisdom", original: "La sagesse commence par le silence.", kurdish: "حيكمەت لە بێدەنگییەوە دەستپێدەکات."},
  {id: "e640", category: "action", original: "Agis comme s'il était impossible d'échouer.", kurdish: "وەها ڕەفتار بکە وەک ئەوەی مەحاڵ بێت شکست بهێنێت."},
  {id: "e641", category: "motivation", original: "Rien n'est impossible à celui qui essaie.", kurdish: "هیچ شتێک مەحاڵ نییە بۆ کەسێک کە هەوڵ بدات."},
  {id: "e642", category: "success", original: "La victoire aime l'effort.", kurdish: "سەرکەوتن حەزی لە ماندووبوونە."},
  {id: "e643", category: "life", original: "Vis la vie que tu aimes, aime la vie que tu vis.", kurdish: "ئەو ژیانە بژی کە حەزت لێیەتی، و ئەو ژیانەی دەیزیت خۆشبوێت."},
  {id: "e644", category: "happiness", original: "La joie est dans tout ce qui nous entoure.", kurdish: "خۆشی لە هەموو ئەو شتانەدایە کە دەورەمانداون."},
  {id: "e645", category: "patience", original: "La patience est amère, mais son fruit est doux.", kurdish: "ئارامگرتن تاڵە، بەڵام بەرەکەی شیرینە."},
  {id: "e646", category: "hope", original: "L'espoir est le pilier du monde.", kurdish: "هیوا ستوونی جیهانە."},
  {id: "e647", category: "love", original: "Là où il y a de l'amour, il y a de la vie.", kurdish: "لەو شوێنەی خۆشەویستی هەیە، ژیانیش هەیە."},
  {id: "e648", category: "growth", original: "Chaque jour est une opportunité de grandir.", kurdish: "هەموو ڕۆژێک دەرفەتێکە بۆ گەشەکردن."},
  {id: "e649", category: "wisdom", original: "Le silence est le plus grand des mépris.", kurdish: "بێدەنگی گەورەترین وەڵامە بۆ کەم سەیرکردن."},
  {id: "e650", category: "motivation", original: "Donne à chaque jour la chance d'être le plus beau de ta vie.", kurdish: "دەرفەت بدە بە هەموو ڕۆژێک تا ببێتە جوانترین ڕۆژی ژیانت."},
  {id: "e651", category: "success", original: "Le succès est la somme de petits efforts répétés.", kurdish: "سەرکەوتن کۆکراوەی هەوڵە بچووکە دووبارەبووەکانە."},
  {id: "e652", category: "courage", original: "Aie le courage de suivre ton cœur.", kurdish: "بوێری ئەوەت هەبێت بەدوای دڵتدا بڕۆیت."},
  {id: "e653", category: "life", original: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", kurdish: "ژیان وەکو بایسکیل وا بێت، دەبێت بۆ پێشەوە بڕۆیت تا هاوسەنگی لەدەست نەدەیت."},
  {id: "e654", category: "happiness", original: "Le bonheur est un choix, pas une chance.", kurdish: "دڵخۆشی هەڵبژاردنێکە، نەک تەنها بەخت."},
  {id: "e655", category: "strength", original: "Sois plus fort que tes excuses.", kurdish: "لە بیانووەکانت بەهێزتر بە."},
  {id: "e656", category: "dreams", original: "Les rêves d'aujourd'hui sont les réalités de demain.", kurdish: "خەونەکانی ئەمڕۆ ڕاستییەکانی سبەینێین."},
  {id: "e657", category: "mindset", original: "Garde l'esprit ouvert et le cœur pur.", kurdish: "مێشکت کراوە ڕابگرە و دڵت پاک بێت."},
  {id: "e658", category: "action", original: "Le meilleur moment pour commencer, c'est maintenant.", kurdish: "باشترین کات بۆ دەستپێکردن، ئێستایە."},
  {id: "e659", category: "wisdom", original: "Écoute beaucoup, parle peu.", kurdish: "زۆر گوێ بگرە، کەم قسە بکە."},
  {id: "e660", category: "motivation", original: "N'abandonne jamais.", kurdish: "هرگیز کۆڵ مەدە."},
  {id: "e661", category: "success", original: "Travailler dur bat le talent.", kurdish: "کاری سەخت بەسەر بەهرەدا سەرکەوتوو دەبێت."},
  {id: "e662", category: "perseverance", original: "La persévérance transforme l'échec en réussite.", kurdish: "بەردەوامی شکست دەگۆڕێت بۆ سەرکەوتن."},
  {id: "e663", category: "life", original: "Crée la vie que tu mérites.", kurdish: "ئەو ژیانە دروست بکە کە شایەنتی."},
  {id: "e664", category: "happiness", original: "La paix de l'esprit est le plus grand trésor.", kurdish: "ئارامی مێشک گەورەترین گەنجینەیە."},
  {id: "e665", category: "strength", original: "Tu es plus fort que tu ne le penses.", kurdish: "تۆ بەهێزتریت لەوەی کە بیری لێدەکەیتەوە."},
  {id: "e666", category: "hope", original: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.", kurdish: "داهاتوو بۆ ئەوانەیە کە باوەڕیان بە جوانی خەونەکانیان هەیە."},
  {id: "e667", category: "love", original: "L'amour rend tout possible.", kurdish: "خۆشەویستی هەموو شتێک ڕێگەپێدراو و ممکین دەکات."},
  {id: "e668", category: "growth", original: "Apprends du passé, vis le présent, espère pour le futur.", kurdish: "لە ڕابردوو فێربە، لە ئێستادا بژی، هیوات بۆ داهاتوو هەبێت."},
  {id: "e669", category: "wisdom", original: "Mieux vaut tard que jamais.", kurdish: "دواکەوتن باشترە لەوەی هەرگیز نەکەیت."},
  {id: "e670", category: "motivation", original: "Reste concentré sur tes objectifs.", kurdish: "سەرنجت لەسەر ئامانجەکانت بمێنێتەوە."},
  {id: "e671", category: "success", original: "Chaque petite victoire compte.", kurdish: "هەموو سەرکەوتنێکی بچووک گرنگە."},
  {id: "e672", category: "courage", original: "Affronte tes peurs avec le sourire.", kurdish: "ڕووبەڕووی ترسەکانت ببەوە بە زەردەخەنەیەکەوە."},
  {id: "e673", category: "life", original: "La vie est faite de choix.", kurdish: "ژیان لە هەڵبژاردنەکانەوە دروست دەبێت."},
  {id: "e674", category: "patience", original: "Sois patient, les meilleures choses prennent du temps.", kurdish: "ئارام بگرە، باشترین شتەکان کاتیان دەوێت."},
  {id: "e675", category: "happiness", original: "Sourire est le meilleur remède.", kurdish: "زەردەخەنە کردن باشترین دەرمانە."},
  {id: "e676", category: "mindset", original: "L'attitude est une petite chose qui fait une grande différence.", kurdish: "هەڵسوکەوت شتێکی بچووکە کە جیاوازییەکی گەورە دروست دەکات."},
  {id: "e677", category: "dreams", original: "Suis tes rêves sans regarder en arrière.", kurdish: "شوێن خەونەکانت بکەوە بێ ئەوەی ئاوڕ لە دواوە بدەیتەوە."},
  {id: "e678", category: "action", original: "Fais le premier pas aujourd'hui.", kurdish: "ئەمڕۆ یەکەم هەنگاو بنێ."},
  {id: "e679", category: "strength", original: "Les tempêtes rendent les arbres plus forts.", kurdish: "تۆفانەکان دارەکان بەهێزتر دەکەن."},
  {id: "e680", category: "motivation", original: "Sois la meilleure version de toi-même.", kurdish: "بە باشترین وەشانی خۆت."},
  {id: "e681", category: "success", original: "Le succès commence par la discipline.", kurdish: "سەرکەوتن لە ڕێکخستن و دیسپلینەوە دەستپێدەکات."},
  {id: "e682", category: "growth", original: "Dépasse tes limites chaque jour.", kurdish: "هەموو ڕۆژێک لە سنوورەکانت تێپەڕە."},
  {id: "e683", category: "wisdom", original: "La vérité finit toujours par triompher.", kurdish: "ڕاستی لە کۆتاییدا هەمیشە سەردەکەوێت."},
  {id: "e684", category: "life", original: "La vie est une aventure audacieuse.", kurdish: "ژیان سەرکێشییەکی بوێرانەیە."},
  {id: "e685", category: "happiness", original: "Entoure-toi de personnes positives.", kurdish: "خۆت دەورە بدە بە کەسانی ئەرێنی."},
  {id: "e686", category: "courage", original: "Ose réaliser tes ambitions.", kurdish: "بوێر بە لە بەدیهێنانی حەز و ئارەزووەکانت."},
  {id: "e687", category: "dreams", original: "Rien n'est trop grand pour un rêveur.", kurdish: "هیچ شتێک زۆر گەورە نییە بۆ کەسێکی خەونبین."},
  {id: "e688", category: "action", original: "Pense moins, agis plus.", kurdish: "کەمتر بیربکەرەوە، زیاتر کار بکە."},
  {id: "e689", category: "patience", original: "Le temps guérit toutes les blessures.", kurdish: "کات هەموو برینەکان ساڕێژ دەکات."},
  {id: "e690", category: "motivation", original: "Tu es le maître de ton destin.", kurdish: "تۆ گەورە و خاوەنی چارەنووسی خۆتی."},
  {id: "e691", category: "success", original: "Travaille dur en silence, laisse le succès faire du bruit.", kurdish: "لە بێدەنگیدا بە سەختی کار بکە، با سەرکەوتنەکەت دەنگ بداتەوە."},
  {id: "e692", category: "mindset", original: "Un esprit positif attire les opportunités.", kurdish: "مێشکێکی ئەرێنی دەرفەتەکان ڕادەکێشێت."},
  {id: "e693", category: "life", original: "Chaque instant est précieux.", kurdish: "هەموو ساتێک گرانبەهایە."},
  {id: "e694", category: "hope", original: "Garde toujours espoir dans ton cœur.", kurdish: "هەمیشە هیوا لە دڵتدا بپارێزە."},
  {id: "e695", category: "love", original: "L'amour est la plus grande force du monde.", kurdish: "خۆشەویستی گەورەترین هێزە لە جیهاندا."},
  {id: "e696", category: "growth", original: "Investis en toi-même.", kurdish: "وەبەرهێنان لە خۆتدا بکە."},
  {id: "e697", category: "wisdom", original: "La vraie richesse est la santé du corps et de l'esprit.", kurdish: "دەوڵەمەندی ڕاستەقینە تەندروستی جەستە و مێشکە."},
  {id: "e698", category: "strength", original: "Résiste et reste fort.", kurdish: "بەرنگار بەوە و بەهێز بمێنەوە."},
  {id: "e699", category: "action", original: "Construis ton avenir dès aujourd'hui.", kurdish: "لە ئەمڕۆوە داهاتووت دروست بکە."},
  {id: "e700", category: "motivation", original: "Tu es le seul héros de ta propre histoire.", kurdish: "تۆ تەنها پاڵەوانی چیرۆکی ژیانی خۆتی."}
  ],

  russian: [
    {id:"r1",category:"love",original:"Ты — моя самая красивая случайность.",kurdish:"تۆ جوانترین ڕووداوی نەچاوەڕوانکراوی منیت."},
    {id:"r2",category:"love",original:"Твоя улыбка делает день светлее.",kurdish:"پێکەنینەکەت ڕۆژ ڕووناکتر دەکاتەوە."},
    {id:"r3",category:"love",original:"Некоторые сердца понимают друг друга без слов.",kurdish:"هەندێک دڵ بەبێ وشە لە یەکتر تێدەگەن."},
    {id:"r4",category:"love",original:"С тобой обычные моменты становятся особенными.",kurdish:"لەگەڵ تۆدا ساتە ئاساییەکان تایبەت دەبن."},
    {id:"r5",category:"love",original:"Доброта — красивый язык любви.",kurdish:"میهرەبانی زمانی جوانی خۆشەویستییە."},
    {id:"r6",category:"love",original:"Твоё счастье важно для меня.",kurdish:"خۆشیی تۆ لام گرنگە."},
    {id:"r7",category:"love",original:"Маленькие воспоминания становятся сокровищами.",kurdish:"بیرەوەرییە بچووکەکان دەبنە گەنجینە."},
    {id:"r8",category:"love",original:"Уважение делает любовь крепче.",kurdish:"ڕێزگرتن خۆشەویستی بەهێزتر دەکات."},
    {id:"r9",category:"love",original:"Рядом с тобой душе спокойно.",kurdish:"لە نزیک تۆدا ڕۆح ئارامە."},
    {id:"r10",category:"love",original:"Искренность помогает сердцам доверять.",kurdish:"ڕاستگۆیی یارمەتی دڵەکان دەدات متمانە بکەن."},
    {id:"r11",category:"sad",original:"Иногда молчание говорит больше слов.",kurdish:"هەندێک جار بێدەنگی زیاتر لە وشە قسە دەکات."},
    {id:"r12",category:"sad",original:"Тоска тихо живёт в сердце.",kurdish:"دڵتەنگی بە بێدەنگی لە دڵدا دەژی."},
    {id:"r13",category:"sad",original:"Некоторые слова приходят слишком поздно.",kurdish:"هەندێک وشە زۆر درەنگ دەگەن."},
    {id:"r14",category:"sad",original:"Воспоминания остаются с нами.",kurdish:"بیرەوەرییەکان لەگەڵمان دەمێننەوە."},
    {id:"r15",category:"sad",original:"Даже сильному сердцу нужен отдых.",kurdish:"تەنانەت دڵی بەهێزیش پێویستی بە پشوودانە."},
    {id:"r16",category:"sad",original:"Грустные дни тоже проходят.",kurdish:"ڕۆژە خەمگینەکانیش تێدەپەڕن."},
    {id:"r17",category:"life",original:"Каждый день даёт новый шанс.",kurdish:"هەر ڕۆژێک دەرفەتێکی نوێ دەدات."},
    {id:"r18",category:"life",original:"Маленькие радости делают жизнь красивой.",kurdish:"خۆشییە بچووکەکان ژیان جوان دەکەن."},
    {id:"r19",category:"life",original:"Душевный покой — настоящее богатство.",kurdish:"ئارامی دڵ گەنجینەیەکی ڕاستەقینەیە."},
    {id:"r20",category:"life",original:"Цени сегодняшний момент.",kurdish:"گرنگی بە ساتی ئەمڕۆ بدە."},
    {id:"r21",category:"motivation",original:"Двигайся в своём темпе.",kurdish:"بە خێرایی خۆت بەرەو پێش بچۆ."},
    {id:"r22",category:"motivation",original:"Ошибки помогают нам учиться.",kurdish:"هەڵەکان یارمەتیمان دەدەن فێر ببین."},
    {id:"r23",category:"motivation",original:"Верь в свои маленькие шаги.",kurdish:"باوەڕ بە هەنگاوە بچووکەکانت بکە."},
    {id:"r24",category:"motivation",original:"Всегда можно начать заново.",kurdish:"هەمیشە دەتوانیت دووبارە دەست پێ بکەیتەوە."},
    {id:"r25",category:"motivation",original:"Впереди тебя ждут новые возможности.",kurdish:"لە پێشتەوە دەرفەتی نوێ چاوەڕێت دەکەن."},
     {id: "r101", category: "motivation", original: "Терпение и труд всё перетрут.", kurdish: "ئارامگرتن و کارکردن هەموو شتێک تێپەڕ دەبێت."},
{id: "r102", category: "life", original: "Жизнь прожить — не поле перейти.", kurdish: "ژیان تێپەڕاندنە، نەک تەنها تێپەڕین بە دەشتێکدا."},
{id: "r103", category: "love", original: "Любовь побеждает всё.", kurdish: "خۆشەویستی بەسەر هەموو شتێکدا سەرکەوتن دەبێت."},
{id: "r104", category: "sad", original: "Слезами горю не поможешь.", kurdish: "بە فرمێسک کێشە چارەسەر نابێت."},
{id: "r105", category: "motivation", original: "Век живи, век учись.", kurdish: "هەتا هەتایە بژی و هەتا هەتایە فێر ببە."},
{id: "r106", category: "life", original: "Тише едешь — дальше будешь.", kurdish: "هێواشتر بڕۆ، دوورتر دەگەیت."},
{id: "r107", category: "love", original: "Ты моё солнце в пасмурный день.", kurdish: "تۆ خۆری منی لە ڕۆژە هەوریدا."},
{id: "r108", category: "sad", original: "Время лечит раны.", kurdish: "کات برینەکان سارێژ دەکات."},
{id: "r109", category: "motivation", original: "Без труда не выловишь и рыбку из пруда.", kurdish: "بێ ماندووبوون ماسییەک لە دەریاچەش دەرناهێنیت."},
{id: "r110", category: "life", original: "Всё тайное становится явным.", kurdish: "هەموو شتێکی نهێنی ئاشکرا دەبێت."},
{id: "r111", category: "love", original: "Моё сердце принадлежит тебе.", kurdish: "دڵم هی تویە."},
{id: "r112", category: "sad", original: "Одиночество — это цена свободы.", kurdish: "تەنهایی باجی ئازادییە."},
{id: "r113", category: "motivation", original: "Сделай шаг, и дорога появится сама.", kurdish: "هەنگاوێک بنێ، و ڕێگاکە خۆی دەردەکەوێت."},
{id: "r114", category: "life", original: "Жизнь дана на добрые дела.", kurdish: "ژیان دراوە بۆ کردەوەی چاک."},
{id: "r115", category: "love", original: "С тобой мне тепло.", kurdish: "لەگەڵ توودا هەست بە گەرمی دەکەم."},
{id: "r116", category: "sad", original: "Грусть проходит, но память остается.", kurdish: "خەم تێپەڕ دەبێت، بەڵام یادەوەری دەمێنێتەوە."},
{id: "r117", category: "motivation", original: "Кто не рискует, тот не пьёт шампанского.", kurdish: "ئەوەی مەترسی نەكات، شەمپانیا ناخواتەوە."},
{id: "r118", category: "life", original: "Век живи, век надейся.", kurdish: "هەتا هەتایە بژی و هەتا هەتایە هیوات هەبێت."},
{id: "r119", category: "love", original: "Любовь слепа.", kurdish: "خۆشەویستی کوێرە."},
{id: "r120", category: "sad", original: "Трудно терять близких.", kurdish: "قورسە لەدەستدانی کەسە نزیکەکان."},
{id: "r121", category: "motivation", original: "Дорогу осилит идущий.", kurdish: "ڕێگا بەو کەسە دەبڕێت کە دەڕوات."},
{id: "r122", category: "life", original: "Всё проходит, и это пройдёт.", kurdish: "هەموو شتێک تێپەڕ دەبێت، ئەمەش تێپەڕ دەبێت."},
{id: "r123", category: "love", original: "Ты моё всё.", kurdish: "تۆ هەموو شتێکی منی."},
{id: "r124", category: "sad", original: "Душа болит без тебя.", kurdish: "گیانم بێ تو ئازاری هەیە."},
{id: "r125", category: "motivation", original: "Надейся на лучшее, но готовься к худшему.", kurdish: "هیوات بە باشترین هەبێت، بەڵام ئامادەبە بۆ خراپترین."},
  {id: "e701", category: "love", original: "Любовь — это всё, что нам нужно.", kurdish: "خۆشەویستی هەموු ئەو شتەیە کە پێویستمان پێیەتی."},
  {id: "e702", category: "love", original: "Ты моё солнце в пасмурный день.", kurdish: "تۆ خۆری منی لە ڕۆژێکی هەوریدا."},
  {id: "e703", category: "love", original: "Я люблю тебя больше жизни.", kurdish: "لە ژیان زیاتر خۆشم دەوێیت."},
  {id: "e704", category: "love", original: "Моё сердце бьется только для тебя.", kurdish: "دڵی من تەنها بۆ تو لێدەدات."},
  {id: "e705", category: "love", original: "Ты моё дыхание и моя жизнь.", kurdish: "تۆ هەناسە و ژیانی منی."},
  {id: "e706", category: "love", original: "С тобой каждый момент особенный.", kurdish: "لەگەڵ تۆدا هەموو ساتێک تایبەتە."},
  {id: "e707", category: "love", original: "Без тебя меня не существует.", kurdish: "بێ تو من بوونم نییە."},
  {id: "e708", category: "love", original: "Твоя улыбка освещает мой мир.", kurdish: "زەردەخەنەکەت جیهانەکەم ڕووناک دەکاتەوە."},
  {id: "e709", category: "love", original: "Ты моя самая прекрасная мечта.", kurdish: "تۆ جوانترین خەونی منی."},
  {id: "e710", category: "love", original: "В твоих глазах моя вселенная.", kurdish: "لە چاوەکانتدا گەردوونی من هەەیە."},
  {id: "e711", category: "love", original: "Я хочу быть с тобой всегда.", kurdish: "دەمەوێت هەمیشە لەگەڵ تۆدا بیدم."},
  {id: "e712", category: "love", original: "Моя любовь к тебе бесконечна.", kurdish: "خۆشەویستی من بۆ تۆ بێپایانە."},
  {id: "e713", category: "love", original: "Ты моё счастье и моя судьба.", kurdish: "تۆ دڵخۆشی و چارەنووسی منی."},
  {id: "e714", category: "love", original: "Каждая секунда с тобой — это подарок.", kurdish: "هەموو چرکەیەک لەگەڵ تۆدا دیارییەکە."},
  {id: "e715", category: "love", original: "Ты моё самое дорогое сокровище.", kurdish: "تۆ گرانبەها ترین گەنجینەی منی."},
  {id: "e716", category: "love", original: "С тобой я нашел свой дом.", kurdish: "لەگەڵ تۆدا ماڵی خۆمم دۆزییەوە."},
  {id: "e717", category: "love", original: "Твой голос — моя любимая музыка.", kurdish: "دەنگت مۆسیقا دڵخوازەکەمە."},
  {id: "e718", category: "love", original: "Я дышу только тобой.", kurdish: "من تەنها بە تۆوە هەناسە دەدەم."},
  {id: "e719", category: "love", original: "Ты мое вечное вдохновение.", kurdish: "تۆ ئیلهامبەخشە هەمیشەییەکەی منی."},
  {id: "e720", category: "love", original: "Никого не люблю так, как тебя.", kurdish: "کەس لە تۆ زیاتر خۆشناوێت."},
  {id: "e721", category: "love", original: "Ты освещаешь мою жизнь.", kurdish: "تۆ ژیانم ڕووناک دەکەیتەوە."},
  {id: "e722", category: "love", original: "Мое сердце принадлежит тебе.", kurdish: "دڵی من بۆ تۆیە."},
  {id: "e723", category: "love", original: "Ты моя реальность и сказка.", kurdish: "تۆ ڕاستی و ئەفسانەی منی."},
  {id: "e724", category: "love", original: "Я скучаю по тебе каждую минуту.", kurdish: "بۆ هەموو دەقەیەک بیرت دەکەم."},
  {id: "e725", category: "love", original: "Ты моя вторая половинка.", kurdish: "تۆ نیوەکەی تری منی."},
  {id: "e726", category: "love", original: "Рядом с тобой мир становится лучше.", kurdish: "لە نزیک تۆوە جیهان دەبێتە شوێنێکی باشتر."},
  {id: "e727", category: "love", original: "Ты моя бесконечная нежность.", kurdish: "تۆ ناسکی بێپایانی منی."},
  {id: "e728", category: "love", original: "Любить тебя — это великое счастье.", kurdish: "خۆشویستنی تۆ دڵخۆشییەکی مەزنە."},
  {id: "e729", category: "love", original: "Ты моя судьба и мой ангел.", kurdish: "تۆ چارەنووس و فریشتەی منی."},
  {id: "e730", category: "love", original: "Твое имя на моих губах всегда.", kurdish: "ناو لە سەر لێوەکانم هەمیشە تۆیت."},
  {id: "e731", category: "love", original: "Я тебя безумно люблю.", kurdish: "بە شێتی خۆشم دەوێیت."},
  {id: "e732", category: "love", original: "Ты заставляешь меня улыбаться.", kurdish: "تۆ وا لە من دەکەیت زەردەخەنە بکەم."},
  {id: "e733", category: "love", original: "Моя душа выбрала тебя.", kurdish: "ڕۆحی من تۆی هەڵبژاردووە."},
  {id: "e734", category: "love", original: "Ты моё единственное желание.", kurdish: "تۆ تاکە ئارەزووی منی."},
  {id: "e735", category: "love", original: "С тобой время останавливается.", kurdish: "لەگەڵ تۆدا کات دەوەستێت."},
  {id: "e736", category: "love", original: "Ты моя любовь на всю жизнь.", kurdish: "تۆ خۆشەویستی هەموو تەمەنی منی."},
  {id: "e737", category: "love", original: "Я живу ради твоей улыбки.", kurdish: "من بۆ زەردەخەنەکەت دەژیم."},
  {id: "e738", category: "love", original: "Ты моё самое яркое воспоминание.", kurdish: "تۆ درەوشاوەترین بیرەوەری منی."},
  {id: "e739", category: "love", original: "Моё сердце выбрало тебя навсегда.", kurdish: "دڵی من بۆ هەمیشە تۆی هەڵبژارد."},
  {id: "e740", category: "love", original: "Ты чудо, которое случилось со мной.", kurdish: "تۆ ئەو معجیزەیەی کە بەسەرمدا هات."},
  {id: "e741", category: "love", original: "Ты мой лучший подарок от судьбы.", kurdish: "تۆ باشترین دیاری چارەنووسی بۆ منی."},
  {id: "e742", category: "love", original: "Рядом с тобой тепло даже в холод.", kurdish: "لە نزیک تۆوە تەنانەت لە سەرمایشدا گەرمم."},
  {id: "e743", category: "love", original: "Ты моя самая сладкая боль и радость.", kurdish: "تۆ شیرینترین ئازار و خۆشی منی."},
  {id: "e744", category: "love", original: "Я хочу состариться вместе с тобой.", kurdish: "دەمەوێت پێکەوە لەگەڵ تۆدا پیر ببم."},
  {id: "e745", category: "love", original: "Ты моё бесконечное небо.", kurdish: "تۆ ئاسمانی بێپایانی منی."},
  {id: "e746", category: "love", original: "Твои объятия — мой безопасный порт.", kurdish: "باوەشت بەندەری ئارامی منە."},
  {id: "e747", category: "love", original: "Ты в каждом моем биении сердца.", kurdish: "تۆ لە هەموو لێدانێکی دڵمدا هەی."},
  {id: "e748", category: "love", original: "Я благодарен судьбе за тебя.", kurdish: "سوپاسگوزاری چارەنووسم بۆ هەبوونی تۆ."},
  {id: "e749", category: "love", original: "Ты мой свет в темноте.", kurdish: "تۆ ڕووناکی منی لە تاریکیدا."},
  {id: "e750", category: "love", original: "Моя любовь чиста и искренна.", kurdish: "خۆشەویستی من پاک و ڕاستگۆیە."},
  {id: "e751", category: "love", original: "Ты моя прекрасная вечность.", kurdish: "تۆ هەمیشەیی جوانی منی."},
  {id: "e752", category: "love", original: "С тобой я чувствую себя живым.", kurdish: "لەگەڵ تۆدا هەست بە ژیان دەکەم."},
  {id: "e753", category: "love", original: "Ты моя главная радость в жизни.", kurdish: "تۆ گەورەترین خۆشی ژیانی منی."},
  {id: "e754", category: "love", original: "Я не представляю жизни без тебя.", kurdish: "ژیان بە بێ تۆ وێنا ناکەم."},
  {id: "e755", category: "love", original: "Ты моя нежность и сила.", kurdish: "تۆ ناسک و هێزی منی."},
  {id: "e756", category: "love", original: "В твоих руках мой мир.", kurdish: "جیهانی من لە دەستەکانی تۆدایە."},
  {id: "e757", category: "love", original: "Ты моя самая большая удача.", kurdish: "تۆ گەورەترین بەختی منی."},
  {id: "e758", category: "love", original: "Мои мысли всегда о тебе.", kurdish: "بیرکردنەوەکانم هەمیشە لە لای تۆیە."},
  {id: "e759", category: "love", original: "Ты мой самый сладкий сон.", kurdish: "تۆ شیرینترین خەونی منی."},
  {id: "e760", category: "love", original: "Я люблю тебя до луны и обратно.", kurdish: "تا مانگ و گەڕانەوە خۆشم دەوێیت."},
  {id: "e761", category: "love", original: "Ты мой океан нежности.", kurdish: "تۆ دەریای ناسکی منی."},
  {id: "e762", category: "love", original: "С тобой хочется молчать и улыбаться.", kurdish: "لەگەڵ تۆدا مرۆڤ حەزی لە بێدەنگی و زەردەخەنەیە."},
  {id: "e763", category: "love", original: "Ты моя главная ценность.", kurdish: "تۆ بەنرخترین شتی ژیانی منی."},
  {id: "e764", category: "love", original: "Моя любовь к тебе не знает границ.", kurdish: "خۆشەویستیم بۆ تۆ هیچ سنوورێک ناناسێت."},
  {id: "e765", category: "love", original: "Ты моё чистое вдохновение.", kurdish: "تۆ ئیلهامبەخشی پاکی منی."},
  {id: "e766", category: "love", original: "Я принадлежу тебе целиком.", kurdish: "من بە تەواوی بۆ تۆم."},
  {id: "e767", category: "love", original: "Ты мой самый родной человек.", kurdish: "تۆ نزیکترین کەسی منی."},
  {id: "e768", category: "love", original: "С тобой я нашел себя.", kurdish: "لەگەڵ تۆدا خۆمم دۆزییەوە."},
  {id: "e769", category: "love", original: "Ты моё солнце в любое время года.", kurdish: "تۆ خۆری منی لە هەموو وەرزەکاندا."},
  {id: "e770", category: "love", original: "Я готов отдать тебе весь мир.", kurdish: "ئامادەم هەموু جیهانت پێشکەش بکەم."},
  {id: "e771", category: "love", original: "Ты моё самое дорогое чудо.", kurdish: "تۆ گرانبەها ترین معجیزەی منی."},
  {id: "e772", category: "love", original: "Твой взгляд сводит меня с ума.", kurdish: "تۆڕی چاوەکانت سەرسامم دەکەن."},
  {id: "e773", category: "love", original: "Ты моя луна и мои звезды.", kurdish: "تۆ مانگ و ئەستێرەکانی منی."},
  {id: "e774", category: "love", original: "Моё сердце поет, когда ты рядом.", kurdish: "دڵی من دەخوێنێت کاتێک لە نزیکتم."},
  {id: "e775", category: "love", original: "Ты моя самая чистая любовь.", kurdish: "تۆ پاکترین خۆشەویستی منی."},
  {id: "e776", category: "love", original: "Без твоего тепла я замерзаю.", kurdish: "بە بێ گەرمای تۆ دەبەستم."},
  {id: "e777", category: "love", original: "Ты моё идеальное отражение.", kurdish: "تۆ ڕەنگدانەوە تەواوەکەی منی."},
  {id: "e778", category: "love", original: "Я буду любить тебя вечно.", kurdish: "بۆ هەمیشە خۆشم دەوێیت."},
  {id: "e779", category: "love", original: "Ты моя единственная страсть.", kurdish: "تۆ تاکە پەرۆشی و خۆشەویستی قووڵی منی."},
  {id: "e780", category: "love", original: "С тобой легко и тепло.", kurdish: "لەگەڵ تۆدا ئاسان و گەرمە."},
  {id: "e781", category: "love", original: "Ты мой лучший выбор в жизни.", kurdish: "تۆ باشترین هەڵبژاردەی ژیانی منی."},
  {id: "e782", category: "love", original: "Моя душа поёт для тебя.", kurdish: "ڕۆحی من بۆ تۆ دەخوێنێت."},
  {id: "e783", category: "love", original: "Ты моё успокоение.", kurdish: "تۆ ئارامکەرەوەی دڵی منی."},
  {id: "e784", category: "love", original: "Я живу только ради твоей любви.", kurdish: "من تەنها بۆ خۆشەویستی تۆ دەژیم."},
  {id: "e785", category: "love", original: "Ты моё самое заветное чудо.", kurdish: "تۆ پیرۆزترین معجیزەی دڵی منی."},
  {id: "e786", category: "love", original: "Каждый день с тобой — это сказка.", kurdish: "هەموو ڕۆژێک لەگەڵ تۆدا ئەفسانەیە."},
  {id: "e787", category: "love", original: "Ты моя нежность во плоти.", kurdish: "تۆ خۆت ناسکی جەستەیی منی."},
  {id: "e788", category: "love", original: "Я хочу засыпать и просыпаться с тобой.", kurdish: "دەمەوێت لەگەڵ تۆدا بخەوم و هەستمەوە."},
  {id: "e789", category: "love", original: "Ты моё сокровище на века.", kurdish: "تۆ گەنجینەی هەتاهەتایی منی."},
  {id: "e790", category: "love", original: "Твоя любовь — моя крепость.", kurdish: "خۆشەویستی تۆ قەڵای منە."},
  {id: "e791", category: "love", original: "Ты моя самая сладкая привычка.", kurdish: "تۆ شیرینترین خووی منی."},
  {id: "e792", category: "love", original: "В твоих глазах утонуть — счастье.", kurdish: "خنکان لە چاوەکانتدا خۆشییە."},
  {id: "e793", category: "love", original: "Ты мой самый главный смысл.", kurdish: "تۆ گەورەترین مانای ژیانی منی."},
  {id: "e794", category: "love", original: "Мое сердце бьется в такт твоему.", kurdish: "دڵی من هاوئاهەنگ لەگەڵ دڵی تۆدا لێدەدات."},
  {id: "e795", category: "love", original: "Ты моя бесконечная нежность и страсть.", kurdish: "تۆ ناسکی و پەرۆشی بێپایانی منی."},
  {id: "e796", category: "love", original: "Я люблю тебя сильнее с каждым днем.", kurdish: "ڕۆژ بە ڕۆژ زیاتر خۆشم دەوێیت."},
  {id: "e797", category: "love", original: "Ты моя радость, ты моя жизнь.", kurdish: "تۆ خۆشی و ژیانی منی."},
  {id: "e798", category: "love", original: "С тобой я чувствую себя счастливым.", kurdish: "لەگەڵ تۆدا هەست بە دڵخۆشی دەکەم."},
  {id: "e799", category: "love", original: "Ты моё всё в этом мире.", kurdish: "تۆ هەموو شتێکی منی لەم جیهاندا."},
  {id: "e800", category: "love", original: "Ты моя вечная и чистая любовь.", kurdish: "تۆ خۆشەویستی هەمیشەیی و پاکی منی."}
  ]

};

/* LANGUAGE LABELS */

const languageNames = {
  korean: "🇰🇷 کۆری",
  english: "🇬🇧 ئینگلیزی",
  arabic: "🇮🇶 عەرەبی",
  hindi: "🇮🇳 هیندی",
  japanese: "🇯🇵 ژاپۆنی",
  french: "🇫🇷 فەڕەنسی",
  russian: "🇷🇺 ڕووسی"
};

const categoryNames = {
  love: "خۆشەویستی ❤️",
  sad: "دڵتەنگی 💔",
  life: "ژیان 🌙",
  motivation: "هاندانی خۆت ✨"
};

const speechLanguages = {
  korean: "ko-KR",
  english: "en-US",
  arabic: "ar",
  hindi: "hi-IN",
  japanese: "ja-JP",
  french: "fr-FR",
  russian: "ru-RU"
};

/* SAFE STORAGE */

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn("Could not read local storage:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save local storage:", error);
    showToast("نەتوانرا زانیارییەکان پاشەکەوت بکرێن.");
  }
}

let favorites = readStorage(STORAGE_KEYS.favorites, []);

if (!Array.isArray(favorites)) {
  favorites = [];
}

/* DOM HELPERS */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function getAllQuotes() {
  return Object.entries(quotesDatabase).flatMap(([language, quotes]) =>
    quotes.map(quote => ({
      ...quote,
      language
    }))
  );
}

function getQuoteById(id) {
  return getAllQuotes().find(quote => quote.id === id);
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

/* FILTERING */

function getFilteredQuotes() {
  const search = state.search.trim().toLocaleLowerCase();

  return getAllQuotes().filter(quote => {
    const languageMatches =
      state.language === "all" || quote.language === state.language;

    const categoryMatches =
      state.category === "all" || quote.category === state.category;

    const searchableText = [
      quote.original,
      quote.kurdish,
      languageNames[quote.language],
      categoryNames[quote.category]
    ].join(" ").toLocaleLowerCase();

    const searchMatches =
      !search || searchableText.includes(search);

    return languageMatches && categoryMatches && searchMatches;
  });
}

/* QUOTE CARD */

function createQuoteCard(quote) {
  const card = makeElement("article", "quote-card");

  const top = makeElement("div", "quote-top");

  top.append(
    makeElement("span", "quote-language", languageNames[quote.language]),
    makeElement("span", "quote-category", categoryNames[quote.category])
  );

  const original = makeElement("p", "quote-original", quote.original);
  original.lang = speechLanguages[quote.language];
  original.dir = quote.language === "arabic" ? "rtl" : "auto";

  const translation = makeElement(
    "p",
    "quote-translation",
    "کوردی: " + quote.kurdish
  );

  const actions = makeElement("div", "quote-actions");

  const favoriteButton = makeElement(
    "button",
    "quote-action" + (favorites.includes(quote.id) ? " is-favorite" : ""),
    favorites.includes(quote.id) ? "♥ دڵخواز" : "♡ دڵخواز"
  );

  favoriteButton.type = "button";
  favoriteButton.setAttribute(
    "aria-pressed",
    String(favorites.includes(quote.id))
  );

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(quote.id);
  });

  const copyButton = makeElement("button", "quote-action", "▣ کۆپی");

  copyButton.type = "button";
  copyButton.addEventListener("click", () => copyQuote(quote));

  const speakButton = makeElement("button", "quote-action", "♫ بخوێنەوە");

  speakButton.type = "button";
  speakButton.addEventListener("click", () => speakQuote(quote));

  actions.append(favoriteButton, copyButton, speakButton);
  card.append(top, original, translation, actions);

  return card;
}

/* RENDER QUOTES */

function renderQuotes() {
  const grid = $("#quoteGrid");
  const empty = $("#emptyMessage");
  const loadMore = $("#loadMore");

  if (!grid || !empty || !loadMore) return;

  const quotes = getFilteredQuotes();
  const visibleQuotes = quotes.slice(0, state.visibleCount);

  grid.replaceChildren();

  visibleQuotes.forEach(quote => {
    grid.appendChild(createQuoteCard(quote));
  });

  empty.classList.toggle("hidden", quotes.length > 0);

  loadMore.classList.toggle(
    "hidden",
    quotes.length <= state.visibleCount
  );
}

function renderFavorites() {
  const grid = $("#favoritesGrid");
  const empty = $("#favoritesEmpty");

  if (!grid || !empty) return;

  const favoriteQuotes = favorites
    .map(getQuoteById)
    .filter(Boolean);

  grid.replaceChildren();

  favoriteQuotes.forEach(quote => {
    grid.appendChild(createQuoteCard(quote));
  });

  empty.classList.toggle("hidden", favoriteQuotes.length > 0);
}

/* FAVORITES */

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favoriteId => favoriteId !== id);
    showToast("لە دڵخوازەکان لابرا ♡");
  } else {
    favorites.push(id);
    showToast("زیادکرا بۆ دڵخوازەکان ♥");
  }

  writeStorage(STORAGE_KEYS.favorites, favorites);

  renderQuotes();
  renderFavorites();
}

/* COPY */

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      if (!success) throw new Error("Copy command failed");
    }

    showToast("کۆپی کرا ✓");
  } catch (error) {
    showToast("کۆپیکردن سەرکەوتوو نەبوو؛ دووبارە هەوڵ بدە.");
  }
}

function copyQuote(quote) {
  copyText(
    quote.original + "\n\nکوردی: " + quote.kurdish +
    "\n\nM~A~MARAL"
  );
}

/* SPEECH */

function speakQuote(quote) {
  if (!("speechSynthesis" in window)) {
    showToast("خوێندنەوەی دەنگ لەم وێبگەڕەدا بەردەست نییە.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(quote.original);
  utterance.lang = speechLanguages[quote.language] || "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  utterance.onerror = () => {
    showToast("دەنگی ئەم زمانە لە ئامێرەکەتدا بەردەست نییە.");
  };

  window.speechSynthesis.speak(utterance);
}

/* FILTER CONTROLS */

function resetVisibleCount() {
  state.visibleCount = 9;
  renderQuotes();
}

$("#quoteSearch")?.addEventListener("input", event => {
  state.search = event.target.value;
  resetVisibleCount();
});

$("#languageFilter")?.addEventListener("change", event => {
  state.language = event.target.value;
  resetVisibleCount();
});

$("#categoryFilter")?.addEventListener("change", event => {
  state.category = event.target.value;
  resetVisibleCount();
});

$("#loadMore")?.addEventListener("click", () => {
  state.visibleCount += 9;
  renderQuotes();
});

$$(".language-card").forEach(button => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;

    if (!quotesDatabase[language]) return;

    state.language = language;

    const filter = $("#languageFilter");
    if (filter) filter.value = language;

    state.visibleCount = 9;

    $("#quotes")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    renderQuotes();
  });
});

/* POEM COPY */

$$(".copy-poem").forEach(button => {
  button.addEventListener("click", () => {
    copyText(button.dataset.poem || "");
  });
});

/* SEARCH PANEL */

$("#searchToggle")?.addEventListener("click", () => {
  const panel = $("#searchPanel");

  if (!panel) return;

  panel.classList.toggle("hidden");

  if (!panel.classList.contains("hidden")) {
    $("#quoteSearch")?.focus();
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

/* THEME */

function applyTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");

  const button = $("#themeToggle");

  if (button) {
    button.textContent = theme === "light" ? "☾" : "☼";
    button.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch (error) {
    console.warn("Theme preference could not be saved.");
  }
}

$("#themeToggle")?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme")
    ? "dark"
    : "light";

  applyTheme(nextTheme);
});

/* MOBILE NAVIGATION */

$("#menuToggle")?.addEventListener("click", () => {
  const nav = $("#mainNav");

  if (!nav) return;

  nav.classList.toggle("open");

  $("#menuToggle").setAttribute(
    "aria-expanded",
    String(nav.classList.contains("open"))
  );
});

$$(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    $("#mainNav")?.classList.remove("open");
  });
});

/* ACTIVE NAV */

function updateActiveNavigation() {
  const sections = $$("main section[id]");
  const marker = window.scrollY + 150;

  let activeId = "home";

  sections.forEach(section => {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  });

  $$(".nav-link").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + activeId
    );
  });

  $("#backToTop")?.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateActiveNavigation, {
  passive: true
});

/* PARTICLES */

function createParticles() {
  const container = $("#particles");

  if (!container) return;

  container.replaceChildren();

  const count = window.innerWidth < 650 ? 18 : 38;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 9 + Math.random() * 16 + "s";
    particle.style.animationDelay = -Math.random() * 20 + "s";
    particle.style.opacity = String(0.2 + Math.random() * 0.7);

    const size = 2 + Math.random() * 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    container.appendChild(particle);
  }
}

/* TOAST */

let toastTimer;

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* BACK TO TOP */

$("#backToTop")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* YEAR */

const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

/* INITIALIZATION */

function initializeApp() {
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  } catch (error) {
    console.warn("Using default theme.");
  }

  applyTheme(savedTheme);
  createParticles();
  renderQuotes();
  renderFavorites();
  updateActiveNavigation();

  console.info(
    "M~A~MARAL initialized:",
    getAllQuotes().length,
    "quotes across",
    Object.keys(quotesDatabase).length,
    "languages."
  );
}

initializeApp();

window.addEventListener("resize", () => {
  createParticles();
});