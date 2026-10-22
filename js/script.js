/* ============================================================
   script.js — скрипти лендингу «Розетка-таймер тижнева 16А / 3680W»
   ============================================================ */

$(document).ready(function () {

    /* ------------------------------------------------------------
       1. Маска телефону
       ------------------------------------------------------------ */
    $('[name="phone"]').inputmask({
        keepStatic: false,
        clearIncomplete: true,
        definitions: {
            'z': { validator: '0' },
            't': { validator: '3' }
        },
        mask: [
            '+380 5z 999-99-99',
            '+380 63 999-99-99',
            '+380 66 999-99-99',
            '+380 67 999-99-99',
            '+380 68 999-99-99',
            '+380 7t 999-99-99',
            '+380 75 999-99-99',
            '+380 77 999-99-99',
            '+380 \\91 999-99-99',
            '+380 \\93 999-99-99',
            '+380 \\94 999-99-99',
            '+380 \\95 999-99-99',
            '+380 \\96 999-99-99',
            '+380 \\97 999-99-99',
            '+380 \\98 999-99-99',
            '+380 \\9\\9 999-99-99'
        ]
    }).attr('required', true);

    /* ------------------------------------------------------------
       2. Перевірка заповненості маски при submit
       ------------------------------------------------------------ */
    $('form').on('submit', function (e) {
        e.preventDefault();
        var phoneInput = $(this).find('[name="phone"]');
        if (phoneInput.inputmask("isComplete")) {
            $(this).children(".button").hide();
            this.submit();
        } else {
            alert("Введіть повний номер телефону.");
        }
    });

    /* ------------------------------------------------------------
       3. Плавний скрол до форми замовлення
       ------------------------------------------------------------ */
    $("a[href^='#']").click(function () {
        var target = $(this).attr("href");
        var product = $(this).parent().find("h3").text();
        $("#order_form select[name='type'] option[value='" + product + "']").prop("selected", true);
        $("html, body").animate({ scrollTop: $(target).offset().top + "px" });
        return false;
    });

    /* ------------------------------------------------------------
       4. Таймер зворотного відліку до кінця дня
       ------------------------------------------------------------ */
    function pad(s) {
        s = ("00" + s).substr(-2);
        return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
    }

    function update() {
        var Now = new Date(), Finish = new Date();
        Finish.setHours(23);
        Finish.setMinutes(59);
        Finish.setSeconds(59);
        if (Now.getHours() === 23 && Now.getMinutes() === 59 && Now.getSeconds() === 59) {
            Finish.setDate(Finish.getDate() + 1);
        }
        var sec = Math.floor((Finish.getTime() - Now.getTime()) / 1000);
        var hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        var min = Math.floor(sec / 60);
        sec -= min * 60;
        $(".timer .hours").html(pad(hrs));
        $(".timer .minutes").html(pad(min));
        $(".timer .seconds").html(pad(sec));
        setTimeout(update, 200);
    }
    update();

    /* ------------------------------------------------------------
       5. Вспливаючі повідомлення .yved («хтось замовив»)
       ------------------------------------------------------------ */
    var i = 0;
    function yved() {
        i = 1;
        $('.yved:nth-child(' + i + ')').fadeIn(500).delay(7000).fadeOut(500);
    }
    setTimeout(function () {
        setInterval(function () {
            i = i + 1;
            if (i > 10) i = 1;
            $('.yved:nth-child(' + i + ')').fadeIn(500).delay(7000).fadeOut(500);
        }, 30000);
        yved();
    }, 10000);

});

/* ------------------------------------------------------------
   6. Ініціалізація каруселі відгуків (після завантаження сторінки)
   ------------------------------------------------------------ */
$(window).on("load", function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoHeight: true,
        smartSpeed: 300,
        mouseDrag: false,
        pullDrag: false,
        nav: true,
        navText: ""
    });
});

/* ------------------------------------------------------------
   7. Захист від подвійної відправки форми
   ------------------------------------------------------------ */
$(document).on('submit', 'form', function (e) {
    var form = $(this);

    if (form.data('submitting')) {
        e.preventDefault();
        return false;
    }

    form.data('submitting', true);

    var btn = form.find('button[type="submit"]');
    btn.text('Відправка...').prop('disabled', true).css({
        'background-color': 'gray',
        'color': 'white'
    });
});

/* ------------------------------------------------------------
   8. Індикатор завантаження при відправці форми
   ------------------------------------------------------------ */
$(".order_form").submit(function () {
    $(this).children(".button").hide();
    $('.img-loading').css('display', 'block');
});