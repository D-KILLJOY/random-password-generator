const passDisp = document.querySelector(".password-disp");
const copyBtnCon = document.querySelector(".copy-button");
const copyBtn = document.querySelector(".copy");
const copiedBtn = document.querySelector(".copied");

const passLen = document.querySelector(".char-length");
const passLenInput = document.querySelector(".range-input");
const checkList = document.querySelectorAll(".check-box");

const generate = document.querySelector(".btn");

const upperCase = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const lowerCase = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const myNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"+",
	"=",
];

const everything = [...upperCase, ...lowerCase];

let password = "";
let passwordLength = 8;

let hasNumbers = false;
let hassymbols = false;

const showPass = () => {
	//! display password
	passDisp.value = password;
	//! display strength
	//! display length
	passLen.textContent = passwordLength;
};

passLenInput.addEventListener("input", () => {
	//! select length
	passwordLength = passLenInput.value;
	showPass();
});

copyBtn.addEventListener("click", () => {
	//! copy password
	passDisp.select();
	passDisp.setSelectionRange(0, 999);
	document.execCommand("copy");
	copyBtnCon.classList.add("show");
	//! toggle copy icon
	copyBtn.style.display = "none";
	copiedBtn.style.display = "block";
	window.getSelection().removeAllRanges();
	// *alternative method
	//  navigator.clipboard.writeText(passDisp.value);
	setTimeout(() => {
		copyBtnCon.classList.remove("show");
		copyBtn.style.display = "block";
		copiedBtn.style.display = "none";
	}, 2500);
});

checkList.forEach((i) => {
	//! include characters

	i.addEventListener("click", () => {
		if (i.classList.contains("numbers")) {
			if (i.checked === true) {
				everything.push(...myNumbers);
				console.log(everything.indexOf(...myNumbers));
				hasNumbers = true;
			} else {
				if (everything.length === 10) {
					everything.splice(0, 10);
				}
				everything.splice(everything.indexOf(...myNumbers), myNumbers.length);
				hasNumbers = false;
			}
		} else if (i.classList.contains("symbols")) {
			if (i.checked === true) {
				everything.push(...symbols);
				console.log(everything.indexOf(...symbols));
				hassymbols = true;
			} else {
				everything.splice(everything.indexOf(...symbols), symbols.length);
				hassymbols = false;
			}
		} else if (i.classList.contains("uppercase")) {
			if (i.checked === true) {
				everything.push(...upperCase);
				console.log(everything.indexOf(...upperCase));
			} else {
				everything.splice(everything.indexOf(...upperCase), upperCase.length);
			}
		} else if (i.classList.contains("lowercase")) {
			if (i.checked === true) {
				everything.push(...lowerCase);
				console.log(everything.indexOf(...lowerCase));
			} else {
				everything.splice(everything.indexOf(...lowerCase), lowerCase.length);
			}
		}
		console.log(everything);
	});
});

generate.addEventListener("click", () => {
	const strengthDisp = document.querySelector(".strength-con");
	const strengthText = document.querySelector(".strength");
	const strengthcolor = document.querySelectorAll(".color");

	console.log("generating");
	password = "";
	let passwordStrength;

	if (everything.length === 0) {
		alert(`Check At least one category`);
	} else {
		for (let i = 0; i < passwordLength; i++) {
			let picker = Math.floor(Math.random() * everything.length);
			password += everything[picker];
			showPass();
		}

		if (passwordLength < 13) {
			if (hasNumbers === false) {
				if (hassymbols === false) {
					passwordStrength = "weak";
				} else if (hassymbols === true) {
					passwordStrength = "moderate";
				}
			} else if (hasNumbers === true) {
				if (hassymbols === false) {
					passwordStrength = "moderate";
				} else if (hassymbols === true) {
					passwordStrength = "strong";
				}
			}
		} else if (passwordLength > 13) {
			if (hasNumbers === false) {
				if (hassymbols === false) {
					passwordStrength = "moderate";
				} else {
					passwordStrength = "strong";
				}
			} else if (hasNumbers === true) {
				if (hassymbols === false) {
					passwordStrength = "strong";
				} else {
					passwordStrength = "very-strong";
				}
			}
		}

		strengthDisp.style.display = "block";
		if (passwordStrength === "weak") {
			strengthText.textContent = "weak";
			strengthText.style.color = `var(--orange)`;
			strengthcolor.forEach(() => {
				strengthcolor[0].style.backgroundColor = `var(--orange)`;
				strengthcolor[1].style.backgroundColor = `#0000005e`;
				strengthcolor[2].style.backgroundColor = `#0000005e`;
				strengthcolor[3].style.backgroundColor = `#0000005e`;
			});
		} else if (passwordStrength === "moderate") {
			strengthText.textContent = "moderate";
			strengthText.style.color = `var(--lime-l)`;
			strengthcolor.forEach(() => {
				strengthcolor[0].style.backgroundColor = `var(--lime-l)`;
				strengthcolor[1].style.backgroundColor = `var(--lime-l)`;
				strengthcolor[2].style.backgroundColor = `#0000005e`;
				strengthcolor[3].style.backgroundColor = `#0000005e`;
			});
		} else if (passwordStrength === "strong") {
			strengthText.textContent = "strong";
			strengthText.style.color = `var(--lime)`;
			strengthcolor.forEach(() => {
				strengthcolor[0].style.backgroundColor = `var(--lime)`;
				strengthcolor[1].style.backgroundColor = `var(--lime)`;
				strengthcolor[2].style.backgroundColor = `var(--lime)`;
				strengthcolor[3].style.backgroundColor = `#0000005e`;
			});
		} else if (passwordStrength === "very-strong") {
			strengthText.textContent = "Very strong";
			strengthText.style.color = `var(--lime)`;
			strengthcolor.forEach(() => {
				strengthcolor[0].style.backgroundColor = `var(--lime)`;
				strengthcolor[1].style.backgroundColor = `var(--lime)`;
				strengthcolor[2].style.backgroundColor = `var(--lime)`;
				strengthcolor[3].style.backgroundColor = `var(--lime)`;
			});
		}
	}

	console.log(hasNumbers);
	console.log(hassymbols);
});
//! generate password

showPass();

console.log(everything);
