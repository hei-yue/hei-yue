oS.Init(
  {
    PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper],
    ZName: [oZombie, oConeheadZombie],
    PicArr: (function () {
        var a = oRepeater.prototype,
          b = a.PicArr;
        return ["images/interface/background1.jpg", b[a.CardGif], b[a.NormalGif]];
      })(),
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 1,
    LevelName: "特别关：随机植物！！",
    LargeWaveFlag: { 10: $("imgFlag1") },
    LoadMusic: function () {
      NewEle("oEmbed", "embed", "width:0;height:0", { src: "music/Look up at the.swf" }, EDAll);
    }
  },
  {
    ArZ: [
      oZombie,
      oZombie,
      oZombie,
      oZombie,
      oZombie,
      oZombie,
      oZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
    ],
    FlagNum: 10,
    SumToZombie: { 1: 7, 2: 10, default: 10 },
    FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
    FlagToMonitor: { 9: [ShowFinalWave, 0] },
    FlagToEnd: function () {
      NewImg("imgSF", "images/card/plants/PotatoMine.png", "left:587px;top:270px", EDAll, {
        onclick: function () {
          GetNewCard(this, oPotatoMine, 6);
        },
      });
      NewImg("PointerUD", "images/interface/PointerDown.gif", "top:235px;left:596px", EDAll);
    },
  }
);
