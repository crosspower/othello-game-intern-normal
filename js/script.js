var which_turn = "black";

// 駒を指定する
function target_piece(x, y) {
    try {
        var result = document.getElementById(x + "," + y);
    } catch {
        return false;
    }
    return result;
}

// index.html から呼ばれる
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

// 盤面を作成する
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

// 駒を置く
function put_piece(row, col, check) {
    if (check) {
        target_piece(row, col).className = which_turn;
    } else {
        target_piece(row, col).className = which_turn;
    }
}

// 駒を返す
function turn_over(row_basis, col_basis, check) {
    var reverse_count = 0;
    var basis_position = [row_basis, col_basis];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x == 0 && y == 0) continue;
            var direction = [x, y];
            var count = 1; // 仮の値
            reverse_count += count;
            if (check) {
                for (let i = 1; i <= count; i++) {
                    var turn_piece = target_piece(row_basis + x * i, col_basis + y * i);
                    turn_piece.className = which_turn;
                }
            }
        }
    } return reverse_count;
}

// 駒を返すチェックを行う
function turn_piece_check(count, basis_position, direction) {
    try {
        var next_position = [basis_position[0] + direction[0], basis_position[1] + direction[1]];
        var next_piece_color = target_piece(next_position[0], next_position[1]).className;
    } catch {
        // 処理を追加
    }
    if (next_piece_color == "none") {
        // 処理を追加
    } else if (next_piece_color == which_turn){
        // 処理を追加
    } else {
        // 処理を追加
    }
    return count;
}
        

// 合計の駒数を数える
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


// 駒の置ける場所を数える
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


// 手番を替える
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
