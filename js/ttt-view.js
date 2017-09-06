class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    console.log($el);
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $(".square").click(e => {
      const $square = $(e.currentTarget);
      let pos = $square.attr("data-pos").split(",").map(el => parseInt(el));
      try {
        this.game.playMove(pos);
        this.makeMove($square);
      }
      catch (error) {
        alert("Invalid move!");
      }
    });
  }

  makeMove($square) {
    $square.removeClass();
    let mark = "";
    if (this.game.currentPlayer === 'x') {
      mark = "x";
    } else {
      mark = "o";
    }
    $square.addClass(mark);
    $square.text(this.game.currentPlayer);
    $square.on("mouseleave", e => {
      const $square = $(e.currentTarget);
      $square.removeClass();
      $square.addClass(mark);
    });
    if (this.game.winner()) {
      const $winningMessage = $("<p>").text(`You win, ${this.game.currentPlayer}!`);
      this.$el.append($winningMessage);
      if (this.game.currentPlayer === "x") {
        const $winner = $(".x");
        $winner.removeClass();
        $winner.addClass("winner");
        const $loser = $(".o");
        $loser.removeClass();
        $loser.addClass("loser");
      }
    }
  }

  setupBoard() {
    const $row = $("<ul>").addClass("grid");
    for (let i = 0; i < 9; i++) {
      let pos = [Math.floor(i / 3), i % 3];
      const $square = $("<li>").addClass("square").attr("data-pos", pos);
      $square.on("mouseenter", e => {
        const $square = $(e.currentTarget);
        $square.css("background-color", "yellow");
      });
      $square.on("mouseleave", e => {
        const $square = $(e.currentTarget);
        $square.removeAttr("style");
        $square.addClass("square");
      });
      $row.append($square);
    }
    this.$el.append($row);
  }
}

module.exports = View;
