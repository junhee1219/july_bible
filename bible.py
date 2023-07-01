
alist = ["골로새서","데살로니가전서","데살로니가후서","디모데전서","디모데후서","야고보서"]
for a in alist:
    for chapter in range(1, 35):  # 1부터 10까지 파일 생성
        filename = f"{a} {chapter}장.txt"
        with open(filename, "w") as file:
            pass
