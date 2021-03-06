ALL_CARDS = [
    ["AA","AKs","AQs","AJs","ATs","A9s","A8s","A7s","A6s","A5s","A4s","A3s","A2s"],
    ["AKo","KK","KQs","KJs","KTs","K9s","K8s","K7s","K6s","K5s","K4s","K3s","K2s"],
    ["AQo","KQo","QQ","QJs","QTs","Q9s","Q8s","Q7s","Q6s","Q5s","Q4s","Q3s","Q2s"],
    ["AJo","KJo","QJo","JJ","JTs","J9s","J8s","J7s","J6s","J5s","J4s","J3s","J2s"],
    ["ATo","KTo","QTo","JTo","TT","T9s","T8s","T7s","T6s","T5s","T4s","T3s","T2s"],
    ["A9o","K9o","Q9o","J9o","T9o","99","98s","97s","96s","95s","94s","93s","92s"],
    ["A8o","K8o","Q8o","J8o","T8o","98o","88","87s","86s","85s","84s","83s","82s"],
    ["A7o","K7o","Q7o","J7o","T7o","97o","87o","77","76s","75s","74s","73s","72s"],
    ["A6o","K6o","Q6o","J6o","T6o","96o","86o","76o","66","65s","64s","63s","62s"],
    ["A5o","K5o","Q5o","J5o","T5o","95o","85o","75o","65o","55","54s","53s","52s"],
    ["A4o","K4o","Q4o","J4o","T4o","94o","84o","74o","64o","54o","44","43s","42s"],
    ["A3o","K3o","Q3o","J3o","T3o","93o","83o","73o","63o","53o","43o","33","32s"],
    ["A2o","K2o","Q2o","J2o","T2o","92o","82o","72o","62o","52o","42o","32o","22"],
]
HAND_SPLITTER = ", "

function getPicker(){
    return document.getElementById("hand-picker")
}


function setRangePickerRange(range){
    var cards = range.split(HAND_SPLITTER)
    setSelectedHands(cards)
}


function drawPicker(){
    picker = getPicker()
    picker.innerHTML = ""
    for (var x = 0; x < 13; x++) {
        var newRow = document.createElement("tr")
        for (var y = 0; y < 13; y++) {
            var c = document.createElement("td")
            c.className = "cell"
            c.innerHTML = ALL_CARDS[x][y]
            c.id = getCellID(ALL_CARDS[x][y])
            if (x == y) {
                c.classList.add("pocket-pair")
            }
            c.classList.add("noselect")
            c.onmousedown = (function(i) {
                return function(){
                    toggleSelection(i)
                    toggleDragToSelect("on")
                }
            })(ALL_CARDS[x][y]);
            c.onmouseup = function(){toggleDragToSelect("off")}
            newRow.appendChild(c)
        }
        picker.appendChild(newRow)
    }
}

function toggleDragToSelect(direction){
    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            var e = document.getElementById(getCellID(ALL_CARDS[x][y]))
            if (direction == "on"){
                e.onmouseenter = (function(i) {
                    return function(){
                        toggleSelection(i)
                        toggleDragToSelect("on")
                    }
                })(ALL_CARDS[x][y]);
            } else{
                e.onmouseenter = function(){}
            }
        }
    }
}


function getSelectedHands() {
    var selectedHands = []
    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            var e = document.getElementById(getCellID(ALL_CARDS[x][y]))
            if (e.classList.contains("selected-cell")) {
                selectedHands.push(ALL_CARDS[x][y])
            }
        }
    }
    return selectedHands
}


function setSelectedHands(handList) {
    deselectAllHands()
    unHighlightHands()
    for (var i = 0; i < handList.length; i++) {
        selectHand(handList[i])
    }
}


function selectHand(hand) {
    var e = document.getElementById(getCellID(hand))
    if (e == undefined || e == null) {
        console.log("Not selecting hand" + hand + ". Picker not loaded yet.")
        console.log("Expected on initial load")
        return
    }
    e.classList.add("selected-cell")
}


function deselectHand(hand) {
    var e = document.getElementById(getCellID(hand))
    if (e == undefined || e == null){
        return
    }
    e.classList.remove("selected-cell")
}


function toggleSelection(hand) {
    if (handIsSelected(hand)){
        deselectHand(hand)
    } else{
        selectHand(hand)
    }
}


function handIsSelected(hand) {
    var e = document.getElementById(getCellID(hand))
    return e.classList.contains("selected-cell")
}


function deselectAllHands() {
    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            deselectHand(ALL_CARDS[x][y])
        }
    }
}


function highlightHands(hands) {
    var cards = hands.split(HAND_SPLITTER)
    for (var i = 0; i < cards.length; i++) {
        var e = document.getElementById(getCellID(cards[i]))
        if (e == undefined || e == null){
            console.log("Did not find cell " + cards[i])
            continue
        }
        e.classList.add("highlighted-cell")
    }
}


function unHighlightHands() {
    for (var x = 0; x < 13; x++) {
        for (var y = 0; y < 13; y++) {
            var e = document.getElementById(getCellID(ALL_CARDS[x][y]))
            if (e != null) {
                e.classList.remove("highlighted-cell")
            }
        }
    }
}


function getCellID(hand) {
    return "cell-" + hand

}


function rfi(){
    hands = "AA, KK, QQ, JJ, TT, 99, 88, 77, 66, 55, 44, 33, 22, "
    hands += "AKs, AQs, AJs, ATs, A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s, "
    hands += "KQs, KJs, KTs, K9s, K8s, QJs, QTs, Q9s, Q8s, JTs, J9s, J8s, "
    hands += "T9s, T8s, 98s, 87s, 76s, 65s, 54s, "
    hands += "AKo, AQo, AJo, ATo, KQo, KJo, KTo, QJo, QTo, JTo"
    unHighlightHands()
    deselectAllHands()
    setRangePickerRange(hands)
}


function polarizedThreeBet(){
    hands = "AA, KK, QQ, JJ, TT, AKs, AQs, AJs, KQs, A5s, A4s, A3s, A2s, "
    hands += "76s, 65s, 54s, AQo"
    unHighlightHands()
    deselectAllHands()
    setRangePickerRange(hands)
}


function rfiDefend(){
    hands = "ATs, A9s, KJs, KTs, KQo, QJs, QTs, AJo, JTs, "
    hands += "T9s, 99, 98s, 88, 87s, 77, 66, 55, 44, 33, 22, ATo, KJo, QJo"
    unHighlightHands()
    deselectAllHands()
    setRangePickerRange(hands)
}
