oS.Init(
  {
    PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater],
    ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
    PicArr: ["images/interface/background1.jpg", "images/interface/trophy.png"],
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 0,
    LevelName: "关卡 1-10",
    LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
    StaticCard: 0,
    LoadMusic: function () {
      NewEle("oEmbed", "embed", "width:0;height:0", { src: "music/Look up at the.swf" }, EDAll);
    },
    StartGame: function () {
      ClearChild($("oEmbed"));
      NewEle("oEmbed", "embed", "width:0;height:0", { src: "music/UraniwaNi.swf" }, EDAll);
      SetVisible($("tdShovel"), $("dFlagMeter"));
      SetNone($("dSunNum"));
      SetBlock($("dTop"));
      oS.InitLawnMower();
      PrepareGrowPlants(function () {
        oP.Monitor({
          f: function () {
            (function () {
              var a = ArCard.length;
              if (a < 10) {
                var c = oS.PName,
                  b = Math.floor(Math.random() * c.length),
                  e = c[b],
                  d = e.prototype,
                  f = "dCard" + Math.random();
                ArCard[a] = { DID: f, PName: e, PixelTop: 600 };
                NewImg(f, d.PicArr[d.CardGif], "top:600px;cursor:pointer", $("dCardList"), {
                  onmouseover: function (g) {
                    ViewPlantTitle(GetChoseCard(f), g);
                  },
                  onmouseout: function () {
                    SetNone($("dTitle"));
                  },
                  onclick: function (g) {
                    ChosePlant(g, oS.ChoseCard, f);
                  },
                });
              }
              oSym.addTask(600, arguments.callee, []);
            })();
            (function () {
              var b = ArCard.length,
                a,
                c;
              while (b--) {
                (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px");
              }
              oSym.addTask(5, arguments.callee, []);
            })();
          },
          ar: [],
        });
        oP.AddZombiesFlag();
        SetVisible($("dFlagMeterContent"));
      });
    },
  },
  {
    ArZ: [
      oZombie,
      oZombie,
      oZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oPoleVaultingZombie,
      oPoleVaultingZombie,
      oBucketheadZombie,
      oBucketheadZombie,
      oBucketheadZombie,
      oBucketheadZombie,
      oBucketheadZombie,
    ],
    FlagNum: 20,
    SumToZombie: { 1: 3, 2: 10, 3: 15, default: 15 },
    FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19], a2: [3, 6, 12, 20, 24, 36, 48, 60] },
    FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
    FlagToEnd: function () {
      NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
        onclick: function () {
          SelectModal(11);
        },
      });
      NewImg("PointerUD", "images/interface/PointerDown.gif", "top:198px;left:269px", EDAll);
    },
  },
  {
    GetChoseCard: function (b) {
      var a = ArCard.length;
      while (a--) {
        ArCard[a].DID == b && ((oS.ChoseCard = a), (a = 0));
      }
      return oS.ChoseCard;
    },
    ChosePlant: function (a, b) {
      var f = ArCard[oS.ChoseCard],
        e = (a = a || event).clientX,
        d = a.clientY + document.body.scrollTop,
        c = f.PName.prototype;
      oS.Chose = 1;
      EditImg(
        EditImg(
          $Pn[c.EName].childNodes[1].cloneNode(false),
          "MovePlant",
          "",
          { left: e - c.width * 0.5 + "px", top: d + 20 - c.height + "px", zIndex: 254 },
          EDAll
        ).cloneNode(false),
        "MovePlantAlpha",
        "",
        { display: "none", filter: "alpha(opacity=40)", opacity: 0.4, zIndex: 30 },
        EDAll
      );
      SetAlpha($(f.DID), 50, 0.5);
      SetNone($("dTitle"));
    },
    CancelPlant: function () {
      ClearChild($("MovePlant"), $("MovePlantAlpha"));
      oS.Chose = 0;
      SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
      oS.ChoseCard = "";
    },
    GrowPlant: function (k, c, b, f, a) {
      var i = oS.ChoseCard,
        g = ArCard[i],
        h = g.PName,
        j = h.prototype,
        d = g.DID,
        e;
      j.CanGrow(k, f, a)
        ? (function () {
            new h().Birth(c, b, f, a, k);
            SetStyle($("imgGrowSoil"), { left: c - 30 + "px", top: b - 40 + "px", zIndex: 3 * f, display: "block" });
            oSym.addTask(20, SetNone, [$("imgGrowSoil")]);
            ClearChild($("MovePlant"), $("MovePlantAlpha"));
            $("dCardList").removeChild((e = $(d)));
            e = null;
            ArCard.splice(i, 1);
            oS.ChoseCard = "";
            oS.Chose = 0;
          })()
        : CancelPlant();
    },
    ViewPlantTitle: function (a) {
      var c = $("dTitle"),
        b = ArCard[a].PName.prototype;
      c.innerHTML = b.CName + "<br>" + b.Tooltip;
      SetStyle(c, { top: 60 * a + "px", left: "100px" });
    },
  }
);
