try:
    import ujson as json
except ImportError:
    import json
import random


ingredients: dict = json.loads(open("ingredients.json", encoding="utf-8").read())

FS = "。"  # Full stop


def get_text_length(*args) -> int:
    """Get the length of the generated text."""
    length = 0
    for arg in args:
        for text in arg:
            length += len(text)
    return length


def generate_bullshit_oil(
    length: int = 100, name: str = None, class_: str = None, event: str = None
) -> str:  # sourcery skip: inline-immediately-returned-variable, switch
    """Generate a random bullshit oil."""

    necessary_component, optional_component = [], []
    necessary_component.extend(
        random.choice(dict_).format(name=name, class_=class_, event=event)
        for _, dict_ in ingredients["必需"].items()
    )

    # 可选列表中的内容优先级从上到下依次降低，但排列成文本时优先级从上到下依次增大，故最后需要反转
    你们, 漂亮的句子, 细节描写 = [], [], []
    while get_text_length(你们, 漂亮的句子, 细节描写) < length - 10:
        for key, dict_ in ingredients["可选"].items():
            if key == "你们...":
                你们.append(random.choice(dict_))
            elif key == "漂亮的句子":
                漂亮的句子.append(random.choice(dict_))
            elif key == "环境描写":
                细节描写.append(random.choice(dict_))
            你们 = list(dict.fromkeys(你们))  # Remove duplicate elements
            漂亮的句子 = list(dict.fromkeys(漂亮的句子))
            细节描写 = list(dict.fromkeys(细节描写))
            if get_text_length(你们, 漂亮的句子, 细节描写) >= length - 10:
                break

    result = (
        FS.join(细节描写)
        + FS
        + FS.join(漂亮的句子)
        + FS
        + FS.join(你们)
        + FS
        + ''.join(necessary_component)
    )   # 开头会有一个句号，故不需要在开头加句号
    result = result[2:]
    result = result.replace("！。", "！").replace("？。", "？").replace("。。", "。")
    
    return result


print(generate_bullshit_oil(20, name="小明", class_="三年级6班", event="考试"))
