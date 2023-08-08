var which_turn = "black";

// 駒を指定する関数
function target_piece(x, y) {
    try {
        var result = document.getElementById(x + "," + y);
    } catch {
        return false;
    }
    return result;
}

// index.html から呼ばれる関数
function start_game() {
    // 盤面を作成する
    create_board()

    // 初期配置

    // click イベント
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            target_piece(row, col).addEventListener(
                "click", () => alert("test")
            );
        }
    }
}

// 盤面を作成する関数
function create_board() {
    for (let row = 0; row < 1; row++) {
        var tr = document.createElement("tr");

        for (let col = 0; col < 1; col++) {
            var td = document.createElement("td");
            var div = document.createElement("div");
            
            // idに座標を入力
            div.className = "none";
            div.id = 0 + "," + 0;
            td.appendChild(div);
            tr.appendChild(td);
        }
        document.getElementById("board").appendChild(tr);
    }
}

// 駒を置く関数
function put_piece(row, col, check) {
    if (check) {
        target_piece(row, col).className = which_turn;
    } else {
        target_piece(row, col).className = which_turn;
    }
}

//周囲8方向の駒を裏返し、その合計駒数を返す関数
function turn_over(row_basis, col_basis, check) {
    var sum_reverse_count = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            // 置いた場所なので処理しない
            if (x == 0 && y == 0) { continue; }
	     
            var reverse_count = 1; // 仮の値で1を指定
	     
            if (check) {
                for (let i = 1; i <= reverse_count; i++) {
                    var turn_piece = target_piece(row_basis + x * i, col_basis + y * i);
                    turn_piece.className = which_turn;
                }
            }
	     sum_reverse_count += reverse_count; // 裏返した駒の合計数に追加
        }
    }
    return sum_reverse_count;
}

// 1方向で何枚裏返せるかを数える関数
function turn_piece_check(count, current_row, current_col, direction) {
    try {
        var next_row = current_row + direction[0];
        var next_col = current_col + direction[1];
        var next_piece_color = target_piece(next_row, next_col).className;    
    } catch {
        // ここに処理を書く  
    }    
    
    if (next_piece_color == "none") {
        // ここに処理を書く    
    }
    if (next_piece_color == which_turn) {
        // ここに処理を書く    
    }
    // ここに処理を書く   
        
    return count;
}

        

// 合計の駒数を数える関数
function total_piece_count() {
    var black_count = 0;
    var white_count = 0;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col ++) {
            if (this.target_piece(row, col).className == "black") {
                black_count += 1;
            } else if (this.target_piece(row, col).className == "white") {
                white_count += 1;
            }
        }
    }
    document.getElementById("black-count").textContent = black_count;
    document.getElementById("white-count").textContent = white_count;

    return [black_count, white_count];
}


// 駒の置ける場所を数える関数
function count_places() {
    var places = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (target_piece(row, col).className == "none") {
                if (turn_over(row, col, false) != 0) {
                    places.push([row, col]);
                }
            }
        }
    }
    if (places.length == 0) {
        return false;
    }
    return places;
}


// 手番を替える関数
function change_turn() {
    var black_result = document.getElementById("black-result");
    var white_result = document.getElementById("white-result");

    if (which_turn == "black") {
        which_turn = "white";
        black_result.className = "result";
        white_result.className = "result selected";
    } else {
        which_turn = "black";
        black_result.className = "result selected";
        white_result.className = "result";
    }
}
