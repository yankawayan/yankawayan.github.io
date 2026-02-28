// ローカルストレージについての説明
// ローカルストレージは、ブラウザにデータを保存するための仕組みで、ユーザーがページを閉じてもデータが保持されます。ローカルストレージはキーと値のペアでデータを保存し、容量は約5MBまでです。JavaScriptのlocalStorageオブジェクトを使用して、データの保存、取得、削除ができます。
// 主なメソッドは以下の通りです:
// - setItem(key, value): データを保存します。keyは保存するデータの名前、valueは保存するデータの値です。
// - getItem(key): 保存されたデータを取得します。keyは取得したいデータの名前です。
// - removeItem(key): 保存されたデータを削除します。keyは削除したいデータの名前です。
// - clear(): すべての保存されたデータを削除します。

let logs = [];
let currentFilter = "all";

// ログを追加する関数
function addLog() {

    const title = document.getElementById("title").value;
    const change = document.getElementById("change").value;
    const result = document.getElementById("result").value;

    const log = {
        date: new Date().toISOString(),
        title,
        change,
        result
    };

    logs.push(log);

    // ログをローカルストレージに保存 // JSON.stringify(logs)でlogs配列を文字列に変換して保存
    localStorage.setItem("designLogs", JSON.stringify(logs));

    renderLogs();

    // フォームをリセット
    document.getElementById("title").value = "";
    document.getElementById("change").value = "";
    // デフォルトの選択肢に戻す
    document.getElementById("result").value = "進化";

    return false; // フォームのデフォルトの送信を防止
}

// DOM操作についての説明
// DOM（Document Object Model）は、HTMLやXMLドキュメントの構造を表すオブジェクトの集合で、JavaScriptを使用してこれらのオブジェクトを操作することができます。DOM操作を行うことで、ウェブページの内容や構造を動的に変更することができます。主なDOM操作には以下のようなものがあります:
// - document.getElementById(id): 指定したIDを持つ要素を取得します。

// ログを表示する関数
function renderLogs() {

    const logList = document.getElementById("logList");
    logList.innerHTML = "";

    // `バッククォート`
    logs.forEach((log, index) => {
        
        if (currentFilter !== "all" && log.result !== currentFilter) {
            return; // フィルタリング条件に合わないログはスキップ
        }

        const li = document.createElement("li");
        
        // Element.textContentは、文字列を安全に挿入し、HTMLタグが無効化されるようにする
        li.innerHTML = `
        <div class="log-header">
            <strong>${log.title}</strong>
            <span class="log-result ${log.result}">${log.result}</span>
        </div>

        <div class="log-date">
            ${log.date}
        </div>

        <div class="log-change">
            ${log.change}
        </div>

        <button onclick="deleteLog(${index})">削除</button>
        `;

        logList.appendChild(li);
    });
}

// ページが読み込まれたときにローカルストレージからログを読み込む
window.onload = function() {
    
    const saved = localStorage.getItem("designLogs");
    if (saved) {
        // ローカルストレージから保存されたログを取得してlogs配列に格納 // JSON.parse(saved)で文字列を再びオブジェクトに変換
        logs = JSON.parse(saved);
        renderLogs();
    }
};

// ログを削除する関数
function deleteLog(index) {
    // logs配列から指定されたインデックスのログを削除
    logs.splice(index, 1);
    // ログをローカルストレージに保存 //配列削除後のlogs配列を文字列に変換して保存
    localStorage.setItem("designLogs", JSON.stringify(logs));
    // ログを再描画
    renderLogs();
}

// フィルタリングする関数
function setFilter(filter) {
    currentFilter = filter;
    renderLogs();
}