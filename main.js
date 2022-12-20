const ingredients = {
    "必需": {
        "呼喊句": [
            "拼搏吧！",
            "我为你们呐喊！",
            "你们是最棒的！",
            "我们为你欢呼跳跃，我们为你骄傲！",
            "让我们拭目以待，让我们呐喊助威！"
        ],
        "落实对象": [
            "加油吧，{class_}的{event}健儿们！",
            "加油，{class_}的{event}选手{name}！",
            "加油吧，{class_}的健儿们！",
            "加油吧，{event}选手们！",
            "加油，{event}选手{name}！",
            "加油吧，{name}！",
            "加油！",
            "尽情挥洒你的汗水与热血吧，{name}！",
            "你是{class_}的骄傲，你是{class_}的希望！",
            "{name}，你是{class_}的骄傲，你是{class_}的希望！",
            "昨天你们以{class_}为荣耀，今天{class_}因你们而自豪！"
        ]
    },
    "可选": {
        "你们...": [
            "在我们心中，你是一个神话",
            "萧瑟的秋风，挡不住你们破竹的锐气",
            "时代的强音正在你的脚下踏响",
            "热血在沸腾，辉煌在你脚下铸就",
            "成功正在终点冲着你高高地招手",
            "用你的实力，用你的精神，去开拓出一片属于你的天地",
            "你是跑道上划过的流星，燃烧自己，洒下光辉",
            "也许你并没有看到成功像你挥手，但你已奋斗拼搏过，相信自己，力量就在心中",
            "努力拼搏，顽强奋斗，即使落后，也顽强不屈，永不退缩",
            "漫漫的长路上，你独挡一面；运动场上，你是颗冲刺的流星",
            "看台上，千百只眼睛充满希望的望着你",
            "面对漫漫的征途，你没有畏惧和退缩。任汗水打湿脊背，任疲惫爬满全身，依然奋力追赶"
        ],
        "漂亮的句子": [
            "用青春和热血来铺洒红色的跑道，用激情点燃胜利的曙光",
            "你是运动场的心脏，跳动梦想；你是漫长路的精神，激励辉煌",
            "也许流星并不少见，但它燃烧的刹那，留给人间最美丽的回忆！也许笑脸并不少见，但胜利的喜悦，总会留给世界精彩的一瞬！",
            "枪响的那一刹那，似流星、似闪电，如骏马奔腾，如蛟龙腾空，如猛虎出洞，不在乎名次高低，不在乎成绩高下",
            "你听那激烈奔跑的脚步声，震撼大地；你听那欢呼加油的呐喊声，催人奋进；你听那热血沸腾的心跳声，燃烧激情",
            "赛场上的旋律，如旋风般急速，如号角般激扬，如激流般奔腾不息",
            "没有比脚更长的路，没有比人更高的山"
        ],
        "细节描写": [
            "晨风轻轻地唤醒骄阳",
            "校园的操场传来发令枪的声响",
            "湿透的衣衫，满头的大汗，无限追求奋力追赶",
            "你们的汗水洒在跑道，浇灌着成功的花朵开放",
            "你们的欢笑飞扬在赛场",
            "环形的跑道，一圈又一圈的坚持，毅力与精神活跃在会场上",
            "湿透的衣衫，满头的大汗，无限追求奋力追赶"
        ]
    }
};

FS = "。"  // Full stop

function getTextLength(...args) {
    let length = 0;
    for (let arg of args) {
        for (let text of arg) {
            length += text.length;
        }
    }
    return length;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function braceFormat(text, dict) {
    // Example: '{age} years old', {'age': 18} -> '18 years old'
    if (dict === null) {
        return text;
    }
    for (let key in dict) {
        for (let i = 0; i < 10; i++) {
            text = text.replace(`{${key}}`, dict[key]);
        }
    }
    return text;
}

function generateBullshitOil(
    length = 80, name = null, class_ = null, event = null
) {
    name = name || null;
    class_ = class_ || null;
    event = event || null;
    let necessaryComponent = ["", "加油吧，null！"];
    while (necessaryComponent[1].includes('null')) {
        necessaryComponent[1] = braceFormat(randomChoice(ingredients["必需"]["落实对象"]),
            { 'name': name, 'class_': class_, 'event': event });
    }
    necessaryComponent[0] = randomChoice(ingredients["必需"]["呼喊句"]);
    let necessaryComponentLength = getTextLength(necessaryComponent);

    let 你们 = [];
    let 漂亮的句子 = [];
    let 细节描写 = [];
    while (getTextLength(你们, 漂亮的句子, 细节描写) < length - necessaryComponentLength) {
        for (let [key, dict_] of Object.entries(ingredients["可选"])) {
            if (key == "你们...") {
                你们.push(randomChoice(dict_));
            } else if (key == "漂亮的句子") {
                漂亮的句子.push(randomChoice(dict_));
            } else if (key == "细节描写") {
                细节描写.push(randomChoice(dict_));
            }
            你们 = [...new Set(你们)];  // Remove duplicate elements
            漂亮的句子 = [...new Set(漂亮的句子)];
            细节描写 = [...new Set(细节描写)];
            if (getTextLength(你们, 漂亮的句子, 细节描写) >= length - necessaryComponentLength) {
                break;
            }
        }
    }

    let result = (
        细节描写.join(FS)
        + FS
        + 漂亮的句子.join(FS)
        + FS
        + 你们.join(FS)
        + FS
        + necessaryComponent.join("")
    )   // 开头会有一个句号，故不需要在开头加句号
    result = result.replace("！。", "！").replace("？。", "？").replace("。。", "。").replace('"', '')
    if (result[0] == FS) {
        result = result.substring(1);
    }

    return result;
}


// console.log(generateBullshitOil(20, "张三", "一年级", "跑步比赛"));


// 以下为前端代码
const port = 5679;  // 服务器端口号
function 生成文章() {
    params = {
        name: document.getElementById("name").value,
        class_: document.getElementById("class_").value,
        event: document.getElementById("event").value,
        length: document.getElementById("range").value
    };
    const result = generateBullshitOil(params.length, params.name, params.class_, params.event);
    document.getElementById("文章").innerText = result;
    return result;
}
function changeValue() {
    document.getElementById("value").innerText = document.getElementById("range").value + " 字";
}
setInterval(changeValue, 20);