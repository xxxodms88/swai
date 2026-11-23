// 학습 노트 — 공부 순서대로. cat은 퀴즈 과목 이름과 연결됨.
// 각 point: h(제목), code(예시 코드, 선택), out(실행 결과, 선택), note(핵심 설명)
const STUDY = [
  {
    id: "list", step: 1, title: "리스트 · 튜플 · 딕셔너리 · 집합", cat: "자료형", src: "리스트 학습하기.pdf",
    goal: "자료형 4가지의 모양과 대표 메서드를 구분할 수 있다.",
    points: [
      { h: "리스트 [ ] — 인덱싱·슬라이싱", code: "a = [1, 2, ['a', 'b', 'c']]\nprint(a[0], a[-1], a[-1][0])\nprint(a[0:2])", out: "1 ['a', 'b', 'c'] a\n[1, 2]", note: "인덱스는 0부터, -1은 마지막. 슬라이싱 끝 번호는 포함 안 됨." },
      { h: "리스트 연산", code: "print([1, 2] + [3, 4])\nprint([1, 2] * 2)\nprint(len([1, 2, 3]))", out: "[1, 2, 3, 4]\n[1, 2, 1, 2]\n3", note: "+는 이어붙이기, *는 반복. 숫자 덧셈이 아님 (→ 그래서 Numpy가 필요)." },
      { h: "리스트 메서드", code: "a = [3, 1, 2]\na.append(4)      # [3, 1, 2, 4] 맨 뒤 추가\na.insert(0, 9)   # [9, 3, 1, 2, 4] 0번 위치에 9\na.remove(9)      # 첫 번째 9 삭제\na.sort()         # [1, 2, 3, 4]\na.reverse()      # [4, 3, 2, 1] 그대로 뒤집기\nx = a.pop()      # x=1, a=[4, 3, 2]\na.extend([5, 6]) # a += [5, 6]", note: "index(x) 위치 찾기, count(x) 개수 세기. del a[1]로 삭제." },
      { h: "튜플 ( ) — 변경 불가", code: "t = (1,)     # 요소 1개면 쉼표 필수\nt2 = 1, 2, 3  # 괄호 생략 가능\nt2[0] = 5     # TypeError!", note: "인덱싱·슬라이싱·+·*·len은 리스트와 같음. 값 수정/삭제만 안 됨." },
      { h: "딕셔너리 {Key: Value}", code: "d = {'name': 'kim', 'age': 20}\nd['city'] = 'seoul'   # 추가\ndel d['age']          # 삭제\nprint(d.get('phone', '없음'))\nprint('name' in d)", out: "없음\nTrue", note: "Key로 바로 접근. get은 없는 키도 오류 없이 None(또는 기본값). clear()는 전체 삭제." },
      { h: "집합 set — 중복 X, 순서 X", code: "s1 = set([1, 2, 2, 3])   # {1, 2, 3}\ns2 = {3, 4}\nprint(s1 & s2, s1 | s2, s1 - s2)\ns1.add(5); s1.update([6, 7]); s1.remove(1)", out: "{3} {1, 2, 3, 4} {1, 2}", note: "& intersection, | union, - difference. 인덱싱 불가 → list()로 변환." },
    ],
  },
  {
    id: "func", step: 2, title: "함수 · 변수 범위 · 모듈", cat: "함수·모듈", src: "함수.pdf",
    goal: "함수를 정의·호출하고 import 형식을 구분할 수 있다.",
    points: [
      { h: "함수 정의와 반환", code: "def plus(v1, v2):\n    result = v1 + v2\n    return result\n\nhap = plus(100, 200)\nprint(hap)", out: "300", note: "매개변수(파라미터)는 함수 안에서만 쓰는 지역 변수. return 없으면 None 반환." },
      { h: "기본값 · 여러 값 반환", code: "def f(a, b=10):\n    return a + b\nprint(f(5), f(5, 1))\n\ndef g():\n    return [1, 2]\nx, y = g()", out: "15 6", note: "기본값이 있는 매개변수는 생략 가능." },
      { h: "지역 변수 vs 전역 변수", code: "a = 20           # 전역\ndef func1():\n    a = 10       # 지역 (전역 a 그대로)\ndef func2():\n    global a     # 전역 a를 바꾸겠다\n    a = 10", note: "함수 안에서 전역 변수를 바꾸려면 global 예약어." },
      { h: "pass", code: "if True:\n    pass   # 할 일 없음 (빈 줄이면 오류)", note: "함수/조건문을 비워둘 때." },
      { h: "모듈 import 형식", code: "import random\nrandom.randrange(1, 46)   # 1~45\n\nfrom random import randrange\nrandrange(1, 46)          # 모듈명 생략\n\nimport math\nprint(dir(math))          # 함수 목록", note: "모듈 = 함수 모음(.py), 패키지 = 모듈 모음(폴더). 표준 / 사용자 정의 / 서드 파티 모듈." },
    ],
  },
  {
    id: "np1", step: 3, title: "Numpy 기초 (배열 · shape)", cat: "Numpy", src: "numpy01.pdf",
    goal: "배열을 만들고 shape·dtype을 읽을 수 있다.",
    points: [
      { h: "왜 Numpy? 리스트 vs 배열", code: "mid = [10, 20, 30]; fin = [70, 80, 90]\nprint(mid + fin)            # 리스트: 이어붙이기\n\nimport numpy as np\nm = np.array([10, 20, 30]); f = np.array([70, 80, 90])\nprint(m + f)                # 배열: 원소끼리 덧셈", out: "[10, 20, 30, 70, 80, 90]\n[ 80 100 120]", note: "Numpy는 C로 구현돼 빠르고, 배열끼리 연산 가능." },
      { h: "shape · dtype", code: "a = np.array([1, 2, 3])\nb = np.array([[1, 2, 3], [2, 3, 4]])\nprint(a.shape, b.shape, b.dtype)", out: "(3,) (2, 3) int64", note: "shape은 괄호 없는 속성. (행, 열). 1차원은 (3,)." },
      { h: "zeros · ones · mean", code: "np.zeros(10)        # 0이 10개\nnp.zeros((3, 5))    # 3x5 → 괄호 두 쌍!\nnp.ones([3, 4])\nnp.array([1, 3, 5]).mean()   # 3.0", note: "np.array(1, 3, 5)는 오류 — 반드시 리스트로." },
      { h: "reshape", code: "x = np.array([1, 3, 5, 7, 9, 11]).reshape(3, 2)\nprint(x)", out: "[[ 1  3]\n [ 5  7]\n [ 9 11]]", note: "원소 개수(6) = 행 × 열 이어야 함." },
    ],
  },
  {
    id: "np2", step: 4, title: "Numpy 인덱싱 · 2차원 · 난수", cat: "Numpy", src: "numpy02.pdf",
    goal: "조건 인덱싱과 arange/linspace/난수 함수를 쓸 수 있다.",
    points: [
      { h: "인덱싱 · 슬라이싱", code: "g = np.array([88, 72, 93, 94])\nprint(g[2], g[-1], g[1:3], g[:2])", out: "93 94 [72 93] [88 72]", note: "리스트와 같은 규칙." },
      { h: "논리적(조건) 인덱싱", code: "ages = np.array([18, 19, 25, 30, 28])\nprint(ages > 20)\nprint(ages[ages > 20])", out: "[False False  True  True  True]\n[25 30 28]", note: "조건식 → 부울 배열 → 그걸 인덱스로 넣으면 True인 값만." },
      { h: "2차원 배열", code: "ny = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(ny[0][2], ny[1, 0])\nx = np.array([[1, 3, 5], [2, 4, 6]])\nprint(x[0].mean(), x.mean())", out: "3 4\n3.0 3.5", note: "첫 인덱스 = 행, 두 번째 = 열." },
      { h: "arange · linspace · logspace", code: "np.arange(5)          # [0 1 2 3 4]\nnp.arange(1, 10, 2)   # [1 3 5 7 9] (stop 미포함)\nnp.linspace(0, 10, 100)  # 0~10 균일하게 100개 (끝 포함)\nnp.logspace(0, 5, 10)    # 10^0~10^5 로그 간격 10개", note: "arange(start, stop, step) / linspace(start, stop, 개수)." },
      { h: "난수", code: "np.random.seed(100)              # 같은 난수 재현\nnp.random.rand(5)                # 0~1 균일 5개\nnp.random.rand(5, 3)             # 5x3\n(20-10)*np.random.rand(5) + 10   # 10~20\nnp.random.randint(1, 7, size=10) # 주사위 10번 (7 미포함)\nnp.random.randn(5)               # 정규분포 (평균0, 표준편차1)\n10 + 2*np.random.randn(5)        # 평균10, 표준편차2", note: "rand=균일, randn=정규(n=normal), randint=정수." },
    ],
  },
  {
    id: "pandas", step: 5, title: "Pandas (Series · DataFrame · 파일 읽기)", cat: "Pandas", src: "Pandas 라이브러리.pdf",
    goal: "Series/DataFrame을 만들고 csv·엑셀을 한글 안 깨지게 읽을 수 있다.",
    points: [
      { h: "Series — 1차원 + 색인", code: "import pandas as pd\nx = pd.Series([7, 3, 5, 8], index=['서울', '대구', '부산', '광주'])\nprint(x[['서울', '대구']])\nprint(x.index, x.values)", note: "index= 생략하면 0,1,2… 자동. 1차원 Series / 2차원 DataFrame / 3차원 Panel." },
      { h: "Series 연산 · unique · 정렬", code: "x = pd.Series([3, 8], index=['서울', '대구'])\ny = pd.Series([2, 4], index=['대구', '대전'])\nprint(x + y)                  # 공통 인덱스만 계산\npd.unique(pd.Series([1, 3, 2, 3]))   # [1 3 2]\nx.reindex(sorted(x.index))", out: "대구    10.0\n대전     NaN\n서울     NaN", note: "인덱스가 안 맞으면 NaN." },
      { h: "DataFrame — 2차원", code: "data = {'age': [23, 43], 'name': ['민준', '현우']}\nx = pd.DataFrame(data, columns=['name', 'age'])\nprint(x.name)       # = x['name']", note: "dict의 key가 열 이름. columns=로 열 순서 지정." },
      { h: "파일 읽기 + 한글 인코딩", code: "df = pd.read_excel('Test.xlsx')\nfood = pd.read_csv('food.csv')\nfood.head()          # 앞 5행\n\n# 공공데이터 한글 깨짐/오류\nacc = pd.read_csv('acci.csv', encoding='euc-kr')  # 또는 '949', 'cp949'\nacc = pd.read_csv('acci.csv', engine='python')", note: "Colab에선 from google.colab import files; files.upload()로 먼저 업로드." },
    ],
  },
  {
    id: "mpl", step: 6, title: "Matplotlib 그래프", cat: "Matplotlib", src: "Matplot.pdf",
    goal: "선·막대·히스토그램과 서식 함수를 쓸 수 있다.",
    points: [
      { h: "선 그래프 + 서식", code: "import matplotlib.pyplot as plt\nx = ['Mon', 'Tue', 'Wed']\ny1 = [13, 16, 15]; y2 = [17, 14, 17]\nplt.plot(x, y1)\nplt.plot(x, y2)\nplt.xlabel('Daily'); plt.ylabel('Books')\nplt.title('판매량')\nplt.legend(['Sold', 'On Shelves'], loc='upper left')\nplt.show()", note: "plot(y)만 주면 x는 0,1,2… (range(len(y)))." },
      { h: "점 그래프 · 축 범위", code: "plt.plot([1, 2, 3], [4, 5, 6], 'bo')   # b=파랑, o=원 점\nplt.axis([0, 4, 0, 10])                # [xmin, xmax, ymin, ymax]\nplt.savefig('a.png')", note: "'ro' 빨간 원, 'g--' 초록 점선." },
      { h: "다양한 그래프 함수", code: "plt.bar(x, y)      # 막대\nplt.pie(y)         # 파이\nplt.figure(figsize=(10, 6))\nplt.hist(data, bins=20, alpha=0.4)   # 히스토그램", note: "bins=구간 수, alpha=투명도, figsize=(가로, 세로)." },
    ],
  },
  {
    id: "font", step: 7, title: "Colab 한글 폰트 설정", cat: "실습데이터", src: "Colab 한글폰트.txt",
    goal: "그래프 한글 깨짐(□□)을 해결할 수 있다.",
    points: [
      { h: "방법 1 — 가장 간단", code: "!pip install koreanize-matplotlib\nimport koreanize_matplotlib", note: "설치는 하이픈(-), import는 밑줄(_)." },
      { h: "방법 2 — 나눔폰트", code: "!sudo apt-get install -y fonts-nanum\n!sudo fc-cache -fv\n!rm ~/.cache/matplotlib -rf\n# → 런타임 다시 시작!\nimport matplotlib.pyplot as plt\nplt.rc('font', family='NanumBarunGothic')", note: "런타임 재시작 안 하면 적용 안 됨. 수업 Seaborn 자료는 'NanumGothic'." },
      { h: "macOS / 경고 끄기", code: "from matplotlib import rc\nrc('font', family='AppleGothic')\n\nimport warnings\nwarnings.filterwarnings('ignore')", note: "Windows는 'Malgun Gothic'." },
    ],
  },
  {
    id: "sns", step: 8, title: "Seaborn — 타이타닉 EDA", cat: "Seaborn", src: "Seaborn 활용 데이터 분석.pdf",
    goal: "groupby로 집계하고 countplot/barplot으로 시각화할 수 있다.",
    points: [
      { h: "데이터 불러오기 · 살펴보기", code: "import seaborn as sns\nd = sns.load_dataset('titanic')\nd.info()        # 열, 자료형, non-null 개수\nd.describe()    # count mean std min 25% 50% 75% max\nd.head(10)", note: "주요 열: survived(0/1), pclass/class, sex, age, who(man/woman/child), alive(yes/no), sibsp, parch." },
      { h: "groupby 집계", code: "d.groupby('alive')['alive'].count()             # 생존자 수\nd.groupby(['sex', 'alive'])['alive'].count()    # 성별×생존\nd.groupby('sex')['survived'].mean()             # 성별 생존율\nd.groupby(['class', 'sex'])['survived'].mean()", note: "survived가 0/1이라 평균 = 생존율." },
      { h: "countplot (개수) vs barplot (평균)", code: "sns.countplot(x='sex', hue='alive', data=d)\nsns.barplot(data=d, x='class', y='survived', hue='sex')\nsns.barplot(data=d, x='sex', y='survived', errorbar=None)  # 신뢰구간 끄기\nplt.show()", note: "hue=색 구분. 막대 위 검은 선 = 신뢰구간 (구버전은 ci=None)." },
      { h: "서브플롯에 나눠 그리기", code: "f, ax = plt.subplots(1, 2, figsize=(8, 5))\nsns.countplot(x='who', hue='alive', data=d, ax=ax[0])\nax[0].set_title('생존자 수')\nax[0].set_ylabel('명수')\nsns.barplot(data=d, x='who', y='survived', ax=ax[1])\nplt.show()", note: "ax= 로 칸 지정, ax[i].set_title / set_xlabel / set_ylabel." },
      { h: "결측치 확인 · 채우기 · 선그래프", code: "d['age'].isnull().sum()\nd[['who', 'age']].groupby('who').mean()\nd.loc[(d['age'].isnull()) & (d['who'] == 'child'), 'age'] = 6\nsns.lineplot(data=d.groupby('age')['survived'].sum(), label='생존자 수')", note: "조건 여러 개는 & + 각각 괄호. loc[행조건, 열] = 값." },
    ],
  },
  {
    id: "crawl", step: 9, title: "웹 크롤링 기초", cat: "웹크롤링", src: "웹크롤링 기초.pdf",
    goal: "requests로 페이지를 받고 BeautifulSoup으로 원하는 부분을 뽑을 수 있다.",
    points: [
      { h: "페이지 가져오기", code: "import requests\nres = requests.get('https://www.daangn.com/hot_articles')\nprint(res.text)    # HTML 전체", note: "태그 확인: 크롬 우클릭 → 검사(F12), Copy → Copy XPath." },
      { h: "BeautifulSoup 객체", code: "from bs4 import BeautifulSoup\nsoup = BeautifulSoup(res.content, 'html.parser')\nprint(soup.head.title)\nprint(soup.p)          # 첫 번째 p 태그\nprint(soup.p.string)   # 텍스트만", note: "파서: 'html.parser', 'lxml', 'html5lib'." },
      { h: "find · find_all · select", code: "soup.head.find('meta', {'name': 'description'}).get('content')\nfor link in soup.find_all('a'):\n    print(link.text.strip(), link.get('href'))\nsoup.find_all(attrs={'class': 'card-title'})\nsoup.select('.card-title')[0].get_text()", note: "find=첫 1개, find_all=전부(리스트), select=CSS 선택자, get=속성값, get_text=텍스트." },
    ],
  },
  {
    id: "wc", step: 10, title: "WordCloud (+ 세종 · 하트 실습)", cat: "WordCloud", src: "wordcloud.pdf · 세종 txt · 하트 이미지",
    goal: "텍스트로 워드클라우드를 만들고 중지어·한글폰트·마스크를 적용할 수 있다.",
    points: [
      { h: "기본 워드클라우드", code: "import wikipedia\ntext = wikipedia.page('Python').content\n\nfrom wordcloud import WordCloud\nwc = WordCloud(width=800, height=400).generate(text)\nplt.imshow(wc)\nplt.axis('off')\nplt.show()", note: "단어 크기 = 빈도. generate()에 텍스트, imshow()로 그리기." },
      { h: "중지어(stop words) 제외", code: "from wordcloud import STOPWORDS\ns = STOPWORDS | {'also', 'one'}     # set 합집합\nwc = WordCloud(stopwords=s).generate(text)", note: "STOPWORDS는 집합(set)이라 | 로 추가." },
      { h: "한글 + 하트 모양 (세종 실습)", code: "text = open('세종.txt', encoding='utf-8').read()\n\nfrom PIL import Image\nimport numpy as np\nmask = np.array(Image.open('heart.jpg'))\n\nwc = WordCloud(font_path='/usr/share/fonts/truetype/nanum/NanumGothic.ttf',\n               mask=mask, background_color='white').generate(text)", note: "한글은 font_path 없으면 □로 깨짐. mask: 흰 부분은 비우고 검은 부분에 글자." },
    ],
  },
  {
    id: "parking", step: 11, title: "실습: 서울시 공영주차장 (전처리)", cat: "실습데이터", src: "공영주차장 csv / xlsx",
    goal: "실제 공공데이터를 읽고 결측치·정렬·필터·집계를 할 수 있다.",
    points: [
      { h: "읽기 · 첫 확인", code: "df = pd.read_csv('주차장.csv', encoding='cp949')   # utf-8이면 UnicodeDecodeError\ndf.shape                 # (1909, 40)\ndf.info()\ndf.isnull().sum()        # 전화번호 922, 위도/경도 673 …", note: "xlsx 버전은 pd.read_excel (1557행 39열)." },
      { h: "개수 세기 · 정렬", code: "df['주차장 종류명'].value_counts()   # 노상 1039, 노외 870\ndf.sort_values('총 주자면', ascending=False).head()\ndf['총 주자면'].mean()               # 약 45.0", note: "1위 천호역 공영주차장(시) 1431면." },
      { h: "필터 · 결측치 처리", code: "df[df['유무료구분명'] == '무료']\ndf[(df['총 주자면'] >= 100) & (df['주차장 종류명'] == '노외 주차장')]\ndf2 = df.dropna(subset=['위도', '경도'])\ndf['일 최대 요금'] = df['일 최대 요금'].fillna(0)", note: "and 대신 &, 조건마다 괄호." },
      { h: "문자열 · 그룹 집계", code: "df['구'] = df['주소'].str.split().str[1]\ndf['구'].value_counts().head()        # 송파구 257, 성동구 220 …\ndf[df['주소'].str.contains('송파구')]\ndf.groupby('주차장 종류명')['기본 주차 요금'].mean()\ndf.rename(columns={'총 주자면': '총 주차면'})\ndf.to_csv('결과.csv', index=False, encoding='utf-8-sig')", note: "문자열 메서드는 .str. 을 거쳐서." },
    ],
  },
  {
    id: "messy", step: 12, title: "실습: 쌀 생산량 · 유기동물 (지저분한 표)", cat: "실습데이터", src: "쌀 생산량 csv · 유기동물 xlsx",
    goal: "머리글이 여러 줄이거나 '-'가 섞인 표를 정리할 수 있다.",
    points: [
      { h: "쌀 생산량 — 머리글 2줄", code: "rice = pd.read_csv('쌀.csv', encoding='cp949', header=1)   # 또는 skiprows=1\nrice = rice.iloc[1:]          # 첫 행 '계'(전국) 제외\nrice.nlargest(3, '합계:생산량 (톤)')\nsns.barplot(data=rice, x='시도별', y='합계:생산량 (톤)')\nplt.xticks(rotation=45)", note: "1위 전라남도 742,913톤, 2위 충청남도, 3위 전라북도." },
      { h: "유기동물 — 머리글 3줄 + '-'", code: "df = pd.read_excel('유기동물.xlsx', sheet_name='데이터', header=[0, 1, 2])\n# 또는 skiprows로 건너뛰고 열 이름 직접 지정\ndf = df.replace('-', 0)\ndf['개'] = df['개'].astype(int)\npd.to_numeric(df['개'], errors='coerce')   # 실패 값은 NaN", note: "'-'가 남아 있으면 astype(int)에서 ValueError." },
    ],
  },
  {
    id: "map", step: 13, title: "실습: 공원 위치 · 서울 지도 (folium)", cat: "실습데이터", src: "공원 xlsx 2개 · 서울 geojson",
    goal: "위도·경도로 마커를 찍고 구별 값을 지도에 색칠할 수 있다. (PDF 범위 밖 — 우선순위 낮음)",
    points: [
      { h: "두 표 합치기", code: "park = pd.read_excel('공원.xlsx')        # 공원명, 주소\ngeo_df = pd.read_excel('공원위치.xlsx')  # 공원명, 주소, 위도, 경도\nall_df = pd.merge(park, geo_df, on='공원명')", note: "on=기준 열. 위아래로 붙이기는 pd.concat." },
      { h: "마커 지도", code: "import folium\nm = folium.Map(location=[37.5665, 126.978], zoom_start=11)\nfor _, row in geo_df.iterrows():\n    folium.Marker([row['위도'], row['경도']], popup=row['공원명']).add_to(m)\nm.save('map.html')", note: "location=[위도, 경도]. popup=클릭, tooltip=마우스 올림." },
      { h: "구별 색칠 (Choropleth)", code: "import json\ngeo = json.load(open('서울.geojson', encoding='utf-8'))   # features 25개\nfolium.Choropleth(geo_data=geo, data=df, columns=['구', '개'],\n                  key_on='feature.properties.SIG_KOR_NM',\n                  fill_color='YlOrRd').add_to(m)", note: "data의 구 이름 ↔ geojson의 SIG_KOR_NM('종로구' 등)을 맞춤." },
    ],
  },
];
