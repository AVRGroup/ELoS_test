const FORM_ACCESS = 'https://docs.google.com/forms/d/e/1FAIpQLSeTbA3iFSmgcNeCaFKuXEKQ0mOBg74mow2ISXzESXOI4afhOQ/formResponse';

export function displayTime(time,timerElement)
{
    let word = window.location.href.includes('english') ? 'Time' : 'Tempo'
    let hour = Math.floor(time / 3600);
    let min = Math.floor(time / 60) % 60;
    let seg = Math.floor(time % 60);
    timerElement.innerText = `${word}: ${hour < 10 ? '0' + hour : hour}:${(min < 10 ? '0' + min : min)}:${(seg < 10 ? '0' + seg : seg)}`;
}

async function uploadLog(data)
{
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST',FORM_ACCESS,true);

        let formData = new FormData();
        for(let i = 0; i < data.length;i++)
        {
            formData.append(data[i][0],data[i][1]);
        }

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                resolve(true);
            }
        };
        xhr.send(formData);
    });
}

export async function configureDataAndUpload(nameInput,ageInput,genderRadioName,progExpRadioName,subBtn,time,redirectPath,level,secondForm)
{

    let langSelector = window.location.href.includes('english') ? 1 : 0;
    const warningVariations = [
        [
            "Ops! Algo deu errado!",
            "Valor da idade incorreto.",
            "É necessário preencher o formulário para avançar."
        ],
        [
            "Oops! Something went wrong!",
            "Age value incorrect.",
            "You must fill out the form to advance."
        ]
    ];

    subBtn.addEventListener('click',async () => {
        let genderInput = document.querySelector(`input[name="${genderRadioName}"]:checked`);
        let progExpInput = document.querySelector(`input[name="${progExpRadioName}"]:checked`);
        let hour = Math.floor(time / 3600);
        let min = Math.floor(time / 60) % 60;
        let seg = Math.floor(time % 60);
        let name = nameInput.value;
        let age = ageInput.value;
        let gender = genderInput != null ? genderInput.value : null;
        let progExp = progExpInput != null ? progExpInput.value : null;
        let data = null;
        let data2 = null;
        if((name != null && name != '') && (age != null && age!= '') && (gender != null && gender != '') && (progExp != null && progExp != ''))
        {
            if(parseFloat(age) >= 1)
            {
                data = [
                    ['entry.1867777838',level],
                    ['entry.746491928',name],
                    ['entry.1029337756',age],
                    ['entry.1806882852',gender],
                    ['entry.1585862028',progExp],
                    ['entry.2140863999',`${hour < 10 ? '0' + hour : hour}:${(min < 10 ? '0' + min : min)}:${(seg < 10 ? '0' + seg : seg)}`]
                ];
            }
            else
            {
                alert(warningVariations[langSelector][1]);
            }
        }
        else
        {
            alert(warningVariations[langSelector][2]);
        }

        if(secondForm.checked)
        {
            let genderInput2 = document.querySelector(`input[name="${genderRadioName}2"]:checked`);
            let progExpInput2 = document.querySelector(`input[name="${progExpRadioName}2"]:checked`);
            let name2 = document.getElementById(nameInput.id + "2").value;
            let age2 = document.getElementById(ageInput.id + "2").value;
            let gender2 = genderInput2 != null ? genderInput2.value : null;
            let progExp2 = progExpInput2 != null ? progExpInput2.value : null;

            if((name2 != null && name2 != '') && (age2 != null && age2!= '') && (gender2 != null && gender2 != '') && (progExp2 != null && progExp2 != ''))
            {
                if(parseFloat(age2) >= 1)
                {
                    data2 = [
                        ['entry.1867777838',level],
                        ['entry.746491928',name2],
                        ['entry.1029337756',age2],
                        ['entry.1806882852',gender2],
                        ['entry.1585862028',progExp2],
                        ['entry.2140863999',`${hour < 10 ? '0' + hour : hour}:${(min < 10 ? '0' + min : min)}:${(seg < 10 ? '0' + seg : seg)}`]
                    ];
                }
                else
                {
                    alert(warningVariations[langSelector][1]);
                }
            }
            else
            {
                alert(warningVariations[langSelector][2]);
            }

            if(data != null && data2 != null)
            {
                subBtn.disabled = true;
                let success = await uploadLog(data);
                let success2 = await uploadLog(data2);
                if(success && success2)
                {
                    window.location.href = redirectPath;
                }
                else
                {
                    alert(warningVariations[langSelector][0]);
                    subBtn.disabled = false;
                }
            }
        }
        else
        {
            if(data != null)
            {
                subBtn.disabled = true;
                let success = await uploadLog(data);
                if(success)
                {
                    window.location.href = redirectPath;
                }
                else
                {
                    alert(warningVariations[langSelector][0]);
                    subBtn.disabled = false;
                }
            }
        }
    });
}