import { db } from "../firebase.js";
import { collection, doc, writeBatch } from "firebase/firestore";

const data = [
  {
    "hanja": "佳",
    "meaning": "아름다울",
    "sound": "가",
    "grade_sanggong": 4
  },
  {
    "hanja": "敢",
    "meaning": "감히",
    "sound": "감",
    "grade_sanggong": 4
  },
  {
    "hanja": "降",
    "meaning": "내릴 / 항복할",
    "sound": "강/항",
    "grade_sanggong": 4
  },
  {
    "hanja": "乾",
    "meaning": "하늘 / 마를",
    "sound": "건",
    "grade_sanggong": 4
  },
  {
    "hanja": "輕",
    "meaning": "가벼울",
    "sound": "경",
    "grade_sanggong": 4
  },
  {
    "hanja": "假",
    "meaning": "거짓",
    "sound": "가",
    "grade_sanggong": 4
  },
  {
    "hanja": "減",
    "meaning": "덜",
    "sound": "감",
    "grade_sanggong": 4
  },
  {
    "hanja": "皆",
    "meaning": "다",
    "sound": "개",
    "grade_sanggong": 4
  },
  {
    "hanja": "堅",
    "meaning": "굳을",
    "sound": "견",
    "grade_sanggong": 4
  },
  {
    "hanja": "驚",
    "meaning": "놀랄",
    "sound": "경",
    "grade_sanggong": 4
  },
  {
    "hanja": "脚",
    "meaning": "다리",
    "sound": "각",
    "grade_sanggong": 4
  },
  {
    "hanja": "甘",
    "meaning": "달",
    "sound": "감",
    "grade_sanggong": 4
  },
  {
    "hanja": "更",
    "meaning": "다시",
    "sound": "갱",
    "grade_sanggong": 4
  },
  {
    "hanja": "潔",
    "meaning": "깨끗할",
    "sound": "결",
    "grade_sanggong": 4
  },
  {
    "hanja": "溪",
    "meaning": "시내",
    "sound": "계",
    "grade_sanggong": 4
  },
  {
    "hanja": "看",
    "meaning": "볼",
    "sound": "간",
    "grade_sanggong": 4
  },
  {
    "hanja": "甲",
    "meaning": "갑옷",
    "sound": "갑",
    "grade_sanggong": 4
  },
  {
    "hanja": "居",
    "meaning": "살",
    "sound": "거",
    "grade_sanggong": 4
  },
  {
    "hanja": "庚",
    "meaning": "일곱째 천간",
    "sound": "경",
    "grade_sanggong": 4
  },
  {
    "hanja": "癸",
    "meaning": "열째 천간 / 북방",
    "sound": "계",
    "grade_sanggong": 4
  },
  {
    "hanja": "渴",
    "meaning": "목마를",
    "sound": "갈",
    "grade_sanggong": 4
  },
  {
    "hanja": "講",
    "meaning": "익힐",
    "sound": "강",
    "grade_sanggong": 4
  },
  {
    "hanja": "巨",
    "meaning": "클",
    "sound": "거",
    "grade_sanggong": 4
  },
  {
    "hanja": "耕",
    "meaning": "별 / 밭 갈",
    "sound": "경",
    "grade_sanggong": 4
  },
  {
    "hanja": "鷄",
    "meaning": "닭",
    "sound": "계",
    "grade_sanggong": 4
  },
  {
    "hanja": "苦",
    "meaning": "괴로울 / 쓸",
    "sound": "고",
    "grade_sanggong": 4
  },
  {
    "hanja": "橋",
    "meaning": "다리",
    "sound": "교",
    "grade_sanggong": 4
  },
  {
    "hanja": "均",
    "meaning": "고를",
    "sound": "균",
    "grade_sanggong": 4
  },
  {
    "hanja": "幾",
    "meaning": "기미 / 몇",
    "sound": "기",
    "grade_sanggong": 4
  },
  {
    "hanja": "但",
    "meaning": "다만 / 거짓",
    "sound": "단/탄",
    "grade_sanggong": 4
  },
  {
    "hanja": "燈",
    "meaning": "등잔",
    "sound": "등",
    "grade_sanggong": 4
  },
  {
    "hanja": "烈",
    "meaning": "세찰 / 매울",
    "sound": "렬",
    "grade_sanggong": 4
  },
  {
    "hanja": "倫",
    "meaning": "인륜",
    "sound": "륜",
    "grade_sanggong": 4
  },
  {
    "hanja": "忙",
    "meaning": "바쁠",
    "sound": "망",
    "grade_sanggong": 4
  },
  {
    "hanja": "眠",
    "meaning": "쉴 / 잘",
    "sound": "면",
    "grade_sanggong": 4
  },
  {
    "hanja": "戊",
    "meaning": "다섯째 천간",
    "sound": "무",
    "grade_sanggong": 4
  },
  {
    "hanja": "穀",
    "meaning": "곡식",
    "sound": "곡",
    "grade_sanggong": 4
  },
  {
    "hanja": "舊",
    "meaning": "예 / 옛",
    "sound": "구",
    "grade_sanggong": 4
  },
  {
    "hanja": "極",
    "meaning": "다할 / 극진할",
    "sound": "극",
    "grade_sanggong": 4
  },
  {
    "hanja": "旣",
    "meaning": "이미",
    "sound": "기",
    "grade_sanggong": 4
  },
  {
    "hanja": "端",
    "meaning": "단정할 / 끝",
    "sound": "단",
    "grade_sanggong": 4
  },
  {
    "hanja": "浪",
    "meaning": "물결",
    "sound": "랑",
    "grade_sanggong": 4
  },
  {
    "hanja": "領",
    "meaning": "거느릴",
    "sound": "령",
    "grade_sanggong": 4
  },
  {
    "hanja": "李",
    "meaning": "오얏나무 / 오얏 / 성씨",
    "sound": "리",
    "grade_sanggong": 4
  },
  {
    "hanja": "妹",
    "meaning": "손아랫누이 / 누이",
    "sound": "매",
    "grade_sanggong": 4
  },
  {
    "hanja": "鳴",
    "meaning": "울",
    "sound": "명",
    "grade_sanggong": 4
  },
  {
    "hanja": "茂",
    "meaning": "무성할",
    "sound": "무",
    "grade_sanggong": 4
  },
  {
    "hanja": "坤",
    "meaning": "땅",
    "sound": "곤",
    "grade_sanggong": 4
  },
  {
    "hanja": "勸",
    "meaning": "권할",
    "sound": "권",
    "grade_sanggong": 4
  },
  {
    "hanja": "及",
    "meaning": "미칠",
    "sound": "급",
    "grade_sanggong": 4
  },
  {
    "hanja": "暖",
    "meaning": "따뜻할",
    "sound": "난",
    "grade_sanggong": 4
  },
  {
    "hanja": "當",
    "meaning": "마땅할",
    "sound": "당",
    "grade_sanggong": 4
  },
  {
    "hanja": "郞",
    "meaning": "사내",
    "sound": "랑",
    "grade_sanggong": 4
  },
  {
    "hanja": "露",
    "meaning": "이슬",
    "sound": "로",
    "grade_sanggong": 4
  },
  {
    "hanja": "莫",
    "meaning": "없을",
    "sound": "막",
    "grade_sanggong": 4
  },
  {
    "hanja": "買",
    "meaning": "살",
    "sound": "매",
    "grade_sanggong": 4
  },
  {
    "hanja": "暮",
    "meaning": "저물",
    "sound": "모",
    "grade_sanggong": 4
  },
  {
    "hanja": "墨",
    "meaning": "먹",
    "sound": "묵",
    "grade_sanggong": 4
  },
  {
    "hanja": "關",
    "meaning": "빗장 / 관계할",
    "sound": "관",
    "grade_sanggong": 4
  },
  {
    "hanja": "卷",
    "meaning": "문서 / 책",
    "sound": "권",
    "grade_sanggong": 4
  },
  {
    "hanja": "急",
    "meaning": "급할",
    "sound": "급",
    "grade_sanggong": 4
  },
  {
    "hanja": "乃",
    "meaning": "이에",
    "sound": "내",
    "grade_sanggong": 4
  },
  {
    "hanja": "待",
    "meaning": "기다릴",
    "sound": "대",
    "grade_sanggong": 4
  },
  {
    "hanja": "凉",
    "meaning": "서늘할",
    "sound": "량",
    "grade_sanggong": 4
  },
  {
    "hanja": "綠",
    "meaning": "푸를",
    "sound": "록",
    "grade_sanggong": 4
  },
  {
    "hanja": "晩",
    "meaning": "저물 / 늦을",
    "sound": "만",
    "grade_sanggong": 4
  },
  {
    "hanja": "麥",
    "meaning": "보리",
    "sound": "맥",
    "grade_sanggong": 4
  },
  {
    "hanja": "卯",
    "meaning": "토끼 / 넷째지지",
    "sound": "묘",
    "grade_sanggong": 4
  },
  {
    "hanja": "勿",
    "meaning": "말",
    "sound": "물",
    "grade_sanggong": 4
  },
  {
    "hanja": "橋",
    "meaning": "다리",
    "sound": "교",
    "grade_sanggong": 4
  },
  {
    "hanja": "歸",
    "meaning": "돌아올 / 돌아갈",
    "sound": "귀",
    "grade_sanggong": 4
  },
  {
    "hanja": "給",
    "meaning": "공급할 / 줄",
    "sound": "급",
    "grade_sanggong": 4
  },
  {
    "hanja": "怒",
    "meaning": "성낼",
    "sound": "노",
    "grade_sanggong": 4
  },
  {
    "hanja": "徒",
    "meaning": "무리",
    "sound": "도",
    "grade_sanggong": 4
  },
  {
    "hanja": "練",
    "meaning": "익힐",
    "sound": "련",
    "grade_sanggong": 4
  },
  {
    "hanja": "柳",
    "meaning": "버들",
    "sound": "류",
    "grade_sanggong": 4
  },
  {
    "hanja": "忘",
    "meaning": "잊을",
    "sound": "망",
    "grade_sanggong": 4
  },
  {
    "hanja": "免",
    "meaning": "면할",
    "sound": "면",
    "grade_sanggong": 4
  },
  {
    "hanja": "妙",
    "meaning": "묘할",
    "sound": "묘",
    "grade_sanggong": 4
  },
  {
    "hanja": "尾",
    "meaning": "꼬리",
    "sound": "미",
    "grade_sanggong": 4
  },
  {
    "hanja": "朴",
    "meaning": "후박나무 / 성씨 / 순박할",
    "sound": "박",
    "grade_sanggong": 4
  },
  {
    "hanja": "凡",
    "meaning": "무릇",
    "sound": "범",
    "grade_sanggong": 4
  },
  {
    "hanja": "扶",
    "meaning": "도울 / 뜰 / 떼 / 나눌 / 거느릴",
    "sound": "부",
    "grade_sanggong": 4
  },
  {
    "hanja": "悲",
    "meaning": "슬플",
    "sound": "비",
    "grade_sanggong": 4
  },
  {
    "hanja": "絲",
    "meaning": "실",
    "sound": "사",
    "grade_sanggong": 4
  },
  {
    "hanja": "喪",
    "meaning": "죽을 / 잃을",
    "sound": "상",
    "grade_sanggong": 4
  },
  {
    "hanja": "昔",
    "meaning": "옛 / 섞일",
    "sound": "석/착",
    "grade_sanggong": 4
  },
  {
    "hanja": "細",
    "meaning": "가늘",
    "sound": "세",
    "grade_sanggong": 4
  },
  {
    "hanja": "壽",
    "meaning": "목숨",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "雖",
    "meaning": "비록",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "純",
    "meaning": "순수할",
    "sound": "순",
    "grade_sanggong": 4
  },
  {
    "hanja": "承",
    "meaning": "이을",
    "sound": "승",
    "grade_sanggong": 4
  },
  {
    "hanja": "甚",
    "meaning": "심할",
    "sound": "심",
    "grade_sanggong": 4
  },
  {
    "hanja": "巖",
    "meaning": "바위",
    "sound": "암",
    "grade_sanggong": 4
  },
  {
    "hanja": "揚",
    "meaning": "날릴",
    "sound": "양",
    "grade_sanggong": 4
  },
  {
    "hanja": "嚴",
    "meaning": "엄할",
    "sound": "엄",
    "grade_sanggong": 4
  },
  {
    "hanja": "飯",
    "meaning": "밥",
    "sound": "반",
    "grade_sanggong": 4
  },
  {
    "hanja": "丙",
    "meaning": "남녘",
    "sound": "병",
    "grade_sanggong": 4
  },
  {
    "hanja": "浮",
    "meaning": "뜰",
    "sound": "부",
    "grade_sanggong": 4
  },
  {
    "hanja": "鼻",
    "meaning": "코",
    "sound": "비",
    "grade_sanggong": 4
  },
  {
    "hanja": "舍",
    "meaning": "집",
    "sound": "사",
    "grade_sanggong": 4
  },
  {
    "hanja": "常",
    "meaning": "항상 / 떳떳할",
    "sound": "상",
    "grade_sanggong": 4
  },
  {
    "hanja": "舌",
    "meaning": "혀",
    "sound": "설",
    "grade_sanggong": 4
  },
  {
    "hanja": "笑",
    "meaning": "웃을 / 웃음",
    "sound": "소",
    "grade_sanggong": 4
  },
  {
    "hanja": "愁",
    "meaning": "근심",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "須",
    "meaning": "모름지기",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "戌",
    "meaning": "개",
    "sound": "술",
    "grade_sanggong": 4
  },
  {
    "hanja": "試",
    "meaning": "시험할 / 시험",
    "sound": "시",
    "grade_sanggong": 4
  },
  {
    "hanja": "我",
    "meaning": "나",
    "sound": "아",
    "grade_sanggong": 4
  },
  {
    "hanja": "暗",
    "meaning": "어두울",
    "sound": "암",
    "grade_sanggong": 4
  },
  {
    "hanja": "讓",
    "meaning": "사양할",
    "sound": "양",
    "grade_sanggong": 4
  },
  {
    "hanja": "余",
    "meaning": "나",
    "sound": "여",
    "grade_sanggong": 4
  },
  {
    "hanja": "房",
    "meaning": "방",
    "sound": "방",
    "grade_sanggong": 4
  },
  {
    "hanja": "伏",
    "meaning": "엎드릴",
    "sound": "복",
    "grade_sanggong": 4
  },
  {
    "hanja": "部",
    "meaning": "떼 / 나눌 / 거느릴",
    "sound": "부",
    "grade_sanggong": 4
  },
  {
    "hanja": "貧",
    "meaning": "가난할",
    "sound": "빈",
    "grade_sanggong": 4
  },
  {
    "hanja": "謝",
    "meaning": "사례할",
    "sound": "사",
    "grade_sanggong": 4
  },
  {
    "hanja": "霜",
    "meaning": "서리",
    "sound": "상",
    "grade_sanggong": 4
  },
  {
    "hanja": "盛",
    "meaning": "성할",
    "sound": "헝",
    "grade_sanggong": 4
  },
  {
    "hanja": "續",
    "meaning": "잇닿을 / 이을",
    "sound": "속",
    "grade_sanggong": 4
  },
  {
    "hanja": "樹",
    "meaning": "나무",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "叔",
    "meaning": "아재비 / 아저씨",
    "sound": "숙",
    "grade_sanggong": 4
  },
  {
    "hanja": "崇",
    "meaning": "높을",
    "sound": "숭",
    "grade_sanggong": 4
  },
  {
    "hanja": "申",
    "meaning": "펼",
    "sound": "신",
    "grade_sanggong": 4
  },
  {
    "hanja": "惡",
    "meaning": "악할 / 욕설할 / 미워할",
    "sound": "악/오",
    "grade_sanggong": 4
  },
  {
    "hanja": "仰",
    "meaning": "우러를",
    "sound": "앙",
    "grade_sanggong": 4
  },
  {
    "hanja": "於",
    "meaning": "어조사",
    "sound": "어",
    "grade_sanggong": 4
  },
  {
    "hanja": "如",
    "meaning": "같을",
    "sound": "여",
    "grade_sanggong": 4
  },
  {
    "hanja": "杯",
    "meaning": "잔",
    "sound": "배",
    "grade_sanggong": 4
  },
  {
    "hanja": "逢",
    "meaning": "맞이할 / 만날",
    "sound": "봉",
    "grade_sanggong": 4
  },
  {
    "hanja": "佛",
    "meaning": "부처",
    "sound": "불",
    "grade_sanggong": 4
  },
  {
    "hanja": "巳",
    "meaning": "뱀",
    "sound": "사",
    "grade_sanggong": 4
  },
  {
    "hanja": "散",
    "meaning": "흩을",
    "sound": "산",
    "grade_sanggong": 4
  },
  {
    "hanja": "暑",
    "meaning": "더울",
    "sound": "서",
    "grade_sanggong": 4
  },
  {
    "hanja": "聖",
    "meaning": "성인",
    "sound": "성",
    "grade_sanggong": 4
  },
  {
    "hanja": "松",
    "meaning": "소나무",
    "sound": "송",
    "grade_sanggong": 4
  },
  {
    "hanja": "秀",
    "meaning": "빼어날",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "宿",
    "meaning": "잘 / 맑을",
    "sound": "숙",
    "grade_sanggong": 4
  },
  {
    "hanja": "拾",
    "meaning": "주울",
    "sound": "습",
    "grade_sanggong": 4
  },
  {
    "hanja": "辛",
    "meaning": "거듭 / 매울",
    "sound": "신",
    "grade_sanggong": 4
  },
  {
    "hanja": "眼",
    "meaning": "눈",
    "sound": "안",
    "grade_sanggong": 4
  },
  {
    "hanja": "哀",
    "meaning": "슬플",
    "sound": "애",
    "grade_sanggong": 4
  },
  {
    "hanja": "億",
    "meaning": "억",
    "sound": "억",
    "grade_sanggong": 4
  },
  {
    "hanja": "汝",
    "meaning": "너",
    "sound": "여",
    "grade_sanggong": 4
  },
  {
    "hanja": "伐",
    "meaning": "칠",
    "sound": "벌",
    "grade_sanggong": 4
  },
  {
    "hanja": "否",
    "meaning": "아닐",
    "sound": "부",
    "grade_sanggong": 4
  },
  {
    "hanja": "朋",
    "meaning": "벗",
    "sound": "붕",
    "grade_sanggong": 4
  },
  {
    "hanja": "私",
    "meaning": "사사로울",
    "sound": "사",
    "grade_sanggong": 4
  },
  {
    "hanja": "傷",
    "meaning": "상처 / 다칠",
    "sound": "상",
    "grade_sanggong": 4
  },
  {
    "hanja": "惜",
    "meaning": "아낄",
    "sound": "석",
    "grade_sanggong": 4
  },
  {
    "hanja": "稅",
    "meaning": "세금",
    "sound": "세",
    "grade_sanggong": 4
  },
  {
    "hanja": "修",
    "meaning": "닦을",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "誰",
    "meaning": "누구",
    "sound": "수",
    "grade_sanggong": 4
  },
  {
    "hanja": "淑",
    "meaning": "잘 / 맑을",
    "sound": "숙",
    "grade_sanggong": 4
  },
  {
    "hanja": "乘",
    "meaning": "탈",
    "sound": "승",
    "grade_sanggong": 4
  },
  {
    "hanja": "深",
    "meaning": "깊을",
    "sound": "심",
    "grade_sanggong": 4
  },
  {
    "hanja": "顔",
    "meaning": "얼굴",
    "sound": "안",
    "grade_sanggong": 4
  },
  {
    "hanja": "也",
    "meaning": "어조사",
    "sound": "야",
    "grade_sanggong": 4
  },
  {
    "hanja": "憶",
    "meaning": "생각할",
    "sound": "억",
    "grade_sanggong": 4
  },
  {
    "hanja": "與",
    "meaning": "줄 / 더불",
    "sound": "여",
    "grade_sanggong": 4
  },
  {
    "hanja": "餘",
    "meaning": "남을",
    "sound": "여",
    "grade_sanggong": 4
  },
  {
    "hanja": "葉",
    "meaning": "잎",
    "sound": "엽",
    "grade_sanggong": 4
  },
  {
    "hanja": "瓦",
    "meaning": "기와",
    "sound": "와",
    "grade_sanggong": 4
  },
  {
    "hanja": "又",
    "meaning": "또",
    "sound": "우",
    "grade_sanggong": 4
  },
  {
    "hanja": "圓",
    "meaning": "둥글",
    "sound": "원",
    "grade_sanggong": 4
  },
  {
    "hanja": "唯",
    "meaning": "오직",
    "sound": "유",
    "grade_sanggong": 4
  },
  {
    "hanja": "酉",
    "meaning": "닭",
    "sound": "유",
    "grade_sanggong": 4
  },
  {
    "hanja": "依",
    "meaning": "의지할",
    "sound": "의",
    "grade_sanggong": 4
  },
  {
    "hanja": "印",
    "meaning": "도장",
    "sound": "인",
    "grade_sanggong": 4
  },
  {
    "hanja": "姊",
    "meaning": "손윗누이 / 손위누이",
    "sound": "자",
    "grade_sanggong": 4
  },
  {
    "hanja": "栽",
    "meaning": "심을",
    "sound": "재",
    "grade_sanggong": 4
  },
  {
    "hanja": "適",
    "meaning": "맞을",
    "sound": "적",
    "grade_sanggong": 4
  },
  {
    "hanja": "淨",
    "meaning": "깨끗할",
    "sound": "정",
    "grade_sanggong": 4
  },
  {
    "hanja": "諸",
    "meaning": "모두",
    "sound": "제",
    "grade_sanggong": 4
  },
  {
    "hanja": "鐘",
    "meaning": "쇠북",
    "sound": "종",
    "grade_sanggong": 4
  },
  {
    "hanja": "曾",
    "meaning": "거듭 / 일찍",
    "sound": "증",
    "grade_sanggong": 4
  },
  {
    "hanja": "枝",
    "meaning": "가지",
    "sound": "지",
    "grade_sanggong": 4
  },
  {
    "hanja": "借",
    "meaning": "빌릴",
    "sound": "차",
    "grade_sanggong": 4
  },
  {
    "hanja": "妻",
    "meaning": "아내",
    "sound": "처",
    "grade_sanggong": 4
  },
  {
    "hanja": "晴",
    "meaning": "갤",
    "sound": "청",
    "grade_sanggong": 4
  },
  {
    "hanja": "丑",
    "meaning": "소",
    "sound": "축",
    "grade_sanggong": 4
  },
  {
    "hanja": "脫",
    "meaning": "벗을",
    "sound": "탈",
    "grade_sanggong": 4
  },
  {
    "hanja": "篇",
    "meaning": "책",
    "sound": "편",
    "grade_sanggong": 4
  },
  {
    "hanja": "彼",
    "meaning": "저",
    "sound": "피",
    "grade_sanggong": 4
  },
  {
    "hanja": "恨",
    "meaning": "한할 / 한",
    "sound": "한",
    "grade_sanggong": 4
  },
  {
    "hanja": "許",
    "meaning": "허락할",
    "sound": "허",
    "grade_sanggong": 4
  },
  {
    "hanja": "戶",
    "meaning": "지게 / 집",
    "sound": "호",
    "grade_sanggong": 4
  },
  {
    "hanja": "歡",
    "meaning": "기뻐할 / 기쁠",
    "sound": "환",
    "grade_sanggong": 4
  },
  {
    "hanja": "厚",
    "meaning": "두터울",
    "sound": "후",
    "grade_sanggong": 4
  },
  {
    "hanja": "胸",
    "meaning": "가슴",
    "sound": "흉",
    "grade_sanggong": 4
  },
  {
    "hanja": "黑",
    "meaning": "검을",
    "sound": "흑",
    "grade_sanggong": 4
  },
  {
    "hanja": "喜",
    "meaning": "기쁠",
    "sound": "희",
    "grade_sanggong": 4
  }
]


async function addDocs() {
  const batch = writeBatch(db);
  const colRef = collection(db, "characters");
  const num = data.length;

  data.forEach((item) => {
    const newDocRef = doc(colRef); // 자동 ID 생성
    batch.set(newDocRef, item);
  });

  try {
    await batch.commit();
    console.log(`${num}개 데이터 삽입 성공`);
  } catch (error) {
    console.error("데이터 삽입 실패:", error);
  }
}


addDocs()