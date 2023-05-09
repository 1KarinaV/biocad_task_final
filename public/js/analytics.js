const getTool = async (id) => {
    fetch(`http://127.0.0.1:3001/tools/get/${id}`,
        {
            method: "GET",
        }
    ).then(response => response.json())
        .then(data => {
            result = data.results[0]

        })
        .catch((err) => {
            console.log(err)
            console.log("An error occured while fetching.")
        })
};

const getLi = (usages) => {
    usages_new = ''
    usages.split('\r\n').map(usage => {
        usages_new += `<li><span class="usage-type">${usage.split(':')[0]}</span><span class="usage-property">: ${usage.split(':')[1]}<span></li>`
    })
    return usages_new
}

const getUsage = async (id) => {
    fetch(`http://127.0.0.1:3001/usage/get/${id}`,
        {
            method: "GET",
        }
    ).then(response => response.json())
        .then(data => {
            // console.log(data)
            data.results.map(result => {}
            )
        })
        .catch((err) => {
            console.log(err)
            console.log("An error occured while fetching.")
        })
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
id = urlParams.get('id')

getTool(id)
getUsage(id)

const date_shortcuts = [1, 7, 14, 30, 90, 180]

const paintGreen = (id) => {
    $('.dates-shortcuts span').removeClass("light-green");
    $('.dates-shortcuts span').eq(id).addClass("light-green");
    date_end = new Date()
    date_start = new Date(new Date().getTime() - (date_shortcuts[id]*24*60*60*1000));
    filter(date_start, date_end)
}

let date_end = new Date('9999-01-01T12:00')
let date_start = new Date('0001-01-01T12:00')


const filter = (date_start, date_end) => {
    $('.usage-item').map(i => {
        console.log(date_start, date_end)
        let current_date = new Date($('.usage-item .date span').eq(i).text())

        if ((date_start <= current_date) && (date_end >= current_date)) {
            $('.usage-item').eq(i).css('display', 'flex')
        } else {
            $('.usage-item').eq(i).css('display', 'none')
        }
    })
}

// Set the default value of the #date-1 input element to the current date and time
const now = new Date()
const formattedNow = now.toISOString().slice(0, 16)
document.querySelector("#date-1").value = formattedNow;
document.querySelector("#date-2").value = formattedNow;

$( "#date-1" ).change('input', function() {
    date_start  = new Date($(this).val())
    $('.dates-shortcuts span').removeClass("light-green");
    filter(date_start, date_end)
});

$( "#date-2" ).change('input', function() {
    date_end  = new Date($(this).val())
    $('.dates-shortcuts span').removeClass("light-green");
    filter(date_start, date_end)
});