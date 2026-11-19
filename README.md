# Лаборатори №1 — UI автомат тест (Playwright)

Нэр - Б.Азтүшиг
Код - B232270014

## Зорилго

Энэхүү лабораторийн ажлаар Playwright ашиглан SauceDemo веб сайтын хэрэглэгчийн интерфэйсийн үндсэн үйлдлүүдийг автомат тестээр шалгав.

## Ашигласан технологи

- Node.js 18+
- TypeScript
- Playwright Test
- Chromium
- Туршилтын сайт: <https://www.saucedemo.com>

## Төслийг ажиллуулах

```bash
npm install
npx playwright install
npx playwright test
```

HTML тайланг харах:

```bash
npx playwright show-report
```

Толгойтой браузер дээр ажиллуулах:

```bash
npx playwright test --headed
```

## Хийгдсэн тестүүд

1. **Амжилттай нэвтрэх** — `standard_user` хэрэглэгчээр нэвтэрч Products хуудас нээгдсэнийг шалгана.
2. **Амжилтгүй нэвтрэх** — буруу нууц үг оруулахад алдааны мэдэгдэл гарсныг шалгана.
3. **Бараа сагслах** — нэвтэрсний дараа Sauce Labs Backpack барааг сагсанд нэмсэн эсэхийг шалгана.

Тестүүд `getByRole`, `getByPlaceholder`, `getByText`, `getByTestId` зэрэг locator болон `expect` assertion ашигладаг. Тест бүр тусдаа хуудас/контекстээр ажилладаг. Амжилттай нэвтэрсэн тестүүдийн дараа `afterEach` hook Logout үйлдэл хийнэ; буруу нэвтрэлтийн тестэд нэвтрэх session үүсдэггүй тул Logout хийх боломжгүй.

## Codegen ба Trace Viewer

Codegen ашиглан үйлдлийг бичүүлж код гаргах:

```bash
npx playwright codegen https://www.saucedemo.com
```

Trace-тэй тест ажиллуулах:

```bash
npx playwright test --trace on
```

Trace файлыг харах:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Trace Viewer нь тестийн алхам, DOM snapshot болон алдааны үеийн мэдээллийг шалгахад тусална. `test-results` хавтас `.gitignore`-д орсон тул багшид үзүүлэх trace-ээ `evidence/trace.zip` нэрээр тусад нь хуулж репозиторт commit хийнэ. Codegen нь браузер дээр хийсэн үйлдлээс эхний код гаргадаг боловч үүссэн кодыг шалгаж, locator болон assertion-ийг сайжруулах шаардлагатай.

## Playwright ба Selenium-ийн харьцуулалт

Playwright нь элемент бэлэн болохыг auto-wait механизмаар хүлээдэг тул олон тохиолдолд гараар wait бичих шаардлага багасдаг. Selenium-д зарим нөхцөлд explicit wait-ийг өөрөө тодорхойлох хэрэгтэй. Playwright нь браузерын хэрэгслүүдийг нэг командаар суулгах боломжтой. Selenium-д ашиглаж буй браузерт тохирох driver-ийн тохиргоо шаардлагатай байж болно. Playwright-ийн Codegen нь браузер дээрх үйлдлээс тестийн код үүсгэж өгдөг. Trace Viewer нь тестийн алхам болон DOM snapshot-ийг харахад тусалдаг. Selenium нь Java, Python, C#, JavaScript зэрэг олон хэлтэй өргөн экосистемтэй бол Playwright нь JavaScript/TypeScript, Python, Java, C# хэлийг дэмждэг. Аль хэрэгслийг сонгох нь төслийн хэл, орчин болон тестийн хэрэгцээнээс хамаарна.

## XPath-аас зайлсхийх шалтгаан

XPath нь DOM-ийн бүтцээс ихээхэн хамааралтай тул HTML бүтэц өөрчлөгдөхөд тест эвдрэх эрсдэлтэй. Харин `getByRole`, `getByLabel`, `getByText`, `getByTestId` зэрэг locator нь хэрэглэгчид харагдах утга эсвэл зориулалтаар элементийг сонгодог учраас унших, засварлахад ойлгомжтой.
