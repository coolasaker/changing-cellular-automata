const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 250;
canvas.width = canvas.height * 2;

function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var array2D = (y,x) => {
    let array = [];
    for(let i = 0 - y; i < y + y; i++) {
        array[i] = [];
        for(let j = 0 - x; j < x + x; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}
var map = array2D(canvas.height,canvas.width);
var map2 = array2D(canvas.height,canvas.width);

var drawing = () => {
	let test = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let i = 0; i < canvas.height; i++) {
		for(let j = 0; j < canvas.width; j++) {
			if(map[i][j] == 1) {
				test = 1;
				ctx.fillStyle = "white";
				ctx.fillRect(j,i,1,1);
			}
		}
	}
	if(test == 0) {
		for(let i = 0; i < canvas.height; i++) {
			for(let j = 0; j < canvas.width; j++) {
				if(RB(1,50) == 1) map[i][j] = 1;
			}
		}
	}
}

var B = [
[3],
[3],
[0,0,0,0,0]
];
var S = [
[1,2,3,4,5],
[2],
[0,0,0,0,0]
];

var rule = 0;
var rules = (x,original) => {
	for(let i = 0; i < 9; i++) {
		if(x == B[rule][i]) {
			return 1;
		}
		if(x == S[rule][i]) {
			return original;
		}
	}
	return 0;
}

var game = () => {
	let neighbours = 0;
	for(let y = 0; y < canvas.height; y++) {
		for(let x = 0; x < canvas.width; x++) {
			map2[y][x] = map[y][x];
			map[y][x] = 0;
		}
	}
	for(let y = 0; y < canvas.height; y++) {
		for(let x = 0; x < canvas.width; x++) {
			for(let i = -1; i < 2; i++) {
				for(let j = -1; j < 2; j++) {
					if(i != 0 || j != 0) {
						let y2 = y + i;
						let x2 = x + j;
						if(map2[y2][x2] == 1) neighbours++;
					}
				}
			}
			map[y][x] = rules(neighbours,map2[y][x]);
			neighbours = 0;
		}
	}
	setTimeout(() => {
		drawing();
		game();
	},1000/30);
}

for(let i = 0; i < canvas.height; i++) {
	for(let j = 0; j < canvas.width; j++) {
		if(RB(1,50) == 1) map[i][j] = 1;
	}
}

game();

setInterval(() => {
	rule++;
	if(rule == 2) {
		for(let i = 0; i < 4; i++) {
			B[2][i] = RB(1,4);
			S[2][i] = RB(1,4);
		}
	}
	if(rule > 2) rule = 0;
},5000)