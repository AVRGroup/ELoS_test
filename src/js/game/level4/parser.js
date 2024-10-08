const errorVariations = [
    [
        'Código inválido:',
        'linha:',
        '(Condição inválida)',
        '(Bloco é aberto mas nunca é fechado)',
        '(Bloco é fechado mas nunca é aberto)',
        'Aviso: O código tem mais linhas do que o robô pode processar. Tente rescrever seu código em',
        'linhas ou menos.'

    ],
    [
        'Invalid code:',
        'line:',
        '(Invalid condition)',
        '(Block is opened but never closed)',
        '(Block is closed but never opened)',
        'Warning: The code has more lines than the robot can process. Try rewriting your code in',
        'lines or less.'
    ]
]

let langSelector = window.location.href.includes('english') ? 1 : 0;

const functionFilter = [
    {
        filter: new RegExp('^andarFrente(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^andarTras(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'normal'
    },
    {
        filter: new RegExp('^desativarLaserAzul(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'mustCondition'
    },
    {
        filter: new RegExp('^desativarLaserVermelho(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'mustCondition'
    },
    {
        filter: new RegExp('^se(\\s+)?\\((\\s+)?.+\\)$'),
        type: 'conditional'
    },
    {
        filter: new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$'),
        type: 'conditional&&blockValidation'
    },
    {
        filter: new RegExp('^senão$'),
        type: 'elseValidation'
    },
    {
        filter: new RegExp('^senão(\\s+)?{$'),
        type: 'elseValidation&&blockValidation'
    },
    {
        filter: new RegExp('^}$'),
        type: "closeBlockValidation"
    },
    {
        filter: new RegExp('^{$'),
        type: "blockValidation"
    },
    {
        filter: new RegExp('^enquanto(\\s+)?\\((\\s+)?.+\\)$'),
        type: 'loop'
    },
    {
        filter: new RegExp('^enquanto(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$'),
        type: 'loop&&blockValidation'
    },
    {
        filter: new RegExp('^girarManivela(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
];

const conditionalParameters = [
    new RegExp('^laserAzulAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$'),
    new RegExp('^laserVermelhoAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$'),
    new RegExp('^portaFechada(\\s+)?\\((\\s+)?\\)(\\s+)?$')
]

function ifValidation(line)
{
    let trimLine = line.trim()
    let condition = line.substring(trimLine.indexOf('(') + 1,trimLine.lastIndexOf(')'))
    for(let i = 0; i < conditionalParameters.length; i++)
    {
        if(conditionalParameters[i].test(condition.trim()))
        {
            return true
        }
        else
        {
            continue
        }
    }

    return false
}

function blockValidation(lines,index)
{
    let valid = false
    let ignoreClosure = 0
    for(let i = index + 1; i < lines.length; i++)
    {
        if(lines[i].includes('}'))
        {
            if(ignoreClosure == 0)
            {
                valid = true
                break
            }
            else
            {
                ignoreClosure--
            }
        }
        else if(lines[i].includes('{'))
        {
            ignoreClosure++
        }
        else
        {
            continue
        }
    }

    return valid
}

function closeBlockValidation(lines,index)
{
    let valid = false
    for(let i = index - 1; i >= 0;i--)
    {
        if(lines[i].includes('{'))
        {
            valid = true
            break
        }
        else
        {
            continue
        }
    }

    return valid
}

function mustConditionValidation(lines,index)
{
    let valid = false
    let completeCommonIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?(\\s+)?$')
    let commonIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)$')
    let completeblockIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{[^}]*?$')
    let blockIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$')
    let commonElse = new RegExp('^senão$')
    let blockElse = new RegExp('^senão(\\s+)?{$')
    let completeCommonElse = new RegExp('^senão(\\s+)?.+(\\s+)?$')
    let completeBlockElse = new RegExp('^senão(\\s+)?{[^]*?$')

    let start = null
    for(let i = index - 1; i >= 0;i--)
    {
        if(commonIf.test(lines[i].trim()) || blockIf.test(lines[i].trim()) || commonElse.test(lines[i].trim()) || blockElse.test(lines[i].trim()))
        {
            start = i
            break
        }
        else
        {
            continue
        }   
    }

    if(start != null)
    {
        let codeTillFunction = ""
        for(let i = start; i < index;i++)
        {
            codeTillFunction += `${lines[i].trim()}\n`
        }
        if(completeCommonIf.test(codeTillFunction.trim()) || completeblockIf.test(codeTillFunction.trim()) || completeCommonElse.test(codeTillFunction.trim()) || completeBlockElse.test(codeTillFunction.trim()))
        {
            valid = true
            return valid
        }
        else
        {
            return valid
        }
    }
    else
    {
        return valid
    }
}

function elseValidation(lines,index)
{
    let valid = false
    let completeCommonIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?.+(\\s+)?$')
    let commonIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)$')
    let completeblockIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{[^]*?}$')
    let blockIf = new RegExp('^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$')

    let start = null
    for(let i = index - 1; i >= 0;i--)
    {
        if(commonIf.test(lines[i].trim()) || blockIf.test(lines[i].trim()))
        {
            start = i
            break
        }
        else
        {
            continue
        }   
    }

    if(start != null)
    {
        let codeTillElse = ""
        for(let i = start; i < index;i++)
        {
            codeTillElse += `${lines[i].trim()}\n`
        }
        if(completeCommonIf.test(codeTillElse.trim()) || completeblockIf.test(codeTillElse.trim()))
        {
            valid = true
            return valid
        }
        else
        {
            return valid
        }
    }
    else
    {
        return valid
    }
}

function predictFunction(lines,index)
{
    const directionFilter = [
        new RegExp('^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$'),
        new RegExp('^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$'),
        new RegExp('^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        new RegExp('^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        new RegExp('^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$')
    ];

    let position = [0,5];
    let axis = 0;
    let value = "+";
    let direction = 0;

    function calcDirection(direction)
    {
        const dirGuide = [
            {
                axis: 0,
                value: "+"
            },
            {
                axis: 1,
                value: "+"
            },
            {
                axis: 0,
                value: "-"
            },
            {
                axis: 1,
                value: "-"
            }
        ];

        return dirGuide[direction];
    }

    function correctRotation(index)
    {
        let i = index;
        if(i > 3)
        {
            return 0;
        }
        else if(i < 0)
        {
            return 3;
        }
        else
        {
            return i;
        }
    }

    for(let i = 0; i < index; i++)
    {
        if(directionFilter[0].test(lines[i]))
        {
            let amount = parseInt(lines[i].substring(lines[i].indexOf("(") + 1,lines[i].indexOf(")")))
            if(value == "+")
            {
                position[axis] += amount;
            }
            else
            {
                position[axis] -= amount;
            }
        }
        else if(directionFilter[1].test(lines[i]))
        {
            let amount = parseInt(lines[i].substring(lines[i].indexOf("(") + 1,lines[i].indexOf(")")))
            if(value == "-")
            {
                position[axis] += amount;
            }
            else
            {
                position[axis] -= amount;
            }   
        }
        else if(directionFilter[2].test(lines[i]))
        {
            direction--;
            direction = correctRotation(direction);
            const obj = calcDirection(direction);
            axis = obj.axis;
            value = obj.value;
        }
        else if(directionFilter[3].test(lines[i]))
        {
            direction++;
            direction = correctRotation(direction);
            const obj = calcDirection(direction);
            axis = obj.axis;
            value = obj.value;
        }
        else if(directionFilter[4].test(lines[i]))
        {
            direction--;
            direction = correctRotation(direction);
            direction--;
            direction = correctRotation(direction);
            const obj = calcDirection(direction);
            axis = obj.axis;
            value = obj.value; 
        }
        else
        {
            continue;
        }
    }

    if(value == '+')
    {
        position[axis]++;
    }
    else
    {
        position[axis]--;
    }

    return position;
}

function printError(text,line)
{
    const consoleElement = document.getElementById('consoleArea');
    consoleElement.innerText += `${errorVariations[langSelector][0]} ${text} ${errorVariations[langSelector][1]} ${line}\n`;
}

export default function parseCode(code,limit = 0)
{
    let codeParsed = "const delay = (milisecs) => {return new Promise((resolve) => setTimeout(resolve,milisecs));}\nasync function runCode(){\n";
    let badLuckFunctions = "\n";
    let lines = code.split('\n');
    let valid = true;
    let totalCommands = 0;
    let nonblockcmd = false;
    for(let i = 0; i < lines.length;i++)
    {
        let validLine = false;
        let lineType;
        if(lines[i].trim() != "")
        {
            for(let j = 0; j < functionFilter.length;j++)
            {
                validLine = functionFilter[j].filter.test(lines[i].trim());
                if(validLine)
                {
                    lineType = functionFilter[j].type;
                    break;
                }
                else
                {
                    continue;
                }
            }

            if(validLine)
            {
                if(lineType === "sequential")
                {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});\n`
                    lineParsed += "await " + lines[i].trim() + (nonblockcmd ? '}' : '') + "\n";
                    codeParsed += lineParsed;
                    totalCommands++;
                    nonblockcmd = false;
                }
                else if(lineType === 'conditional&&blockValidation')
                {
                    let validConditional = false;
                    if(blockValidation(lines,i))
                    {
                        if(ifValidation(lines[i]))
                        {
                            validConditional = true;          
                        }
                        else
                        {
                            printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1);
                        }   
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`,i+1);   
                    }

                    if(validConditional)
                    {
                        let line = lines[i].trim();
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`
                        lineParsed += `if${line.substring(line.indexOf('('))}\n`;
                        codeParsed += lineParsed;   
                        totalCommands++;
                    }
                    else
                    {
                        valid = false;
                        break;
                    }
                }
                else if(lineType === 'conditional')
                {
                    if(ifValidation(lines[i]))
                    {
                        let line = lines[i].trim();
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`
                        lineParsed += `if${line.substring(line.indexOf('('))}{\n`;
                        codeParsed += lineParsed;   
                        totalCommands++;
                        nonblockcmd = true;
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1);
                        valid = false;
                        break;
                    }
                }
                else if(lineType === 'elseValidation')
                {
                    if(elseValidation(lines,i))
                    {
                        let lineParsed = 'else{\n'
                        codeParsed += lineParsed
                        totalCommands++
                        nonblockcmd = true;
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1)
                        valid = false
                        break
                    }
                }
                else if(lineType === 'elseValidation&&blockValidation')
                {
                    let validElse = false
                    if(blockValidation(lines,i))
                    {
                        if(elseValidation(lines,i))
                        {
                            validElse = true
                        }
                        else
                        {
                            printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1)
                        }
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`,i+1)
                    }

                    if(validElse)
                    {
                        let lineParsed = 'else{\n'
                        codeParsed += lineParsed
                        totalCommands++
                    }
                    else
                    {
                        valid = false
                        break
                    }
                }
                else if(lineType === "blockValidation")
                {
                    if(blockValidation(lines,i))
                    {
                        let lineParsed = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed;
                        totalCommands++;
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`,i+1);
                        valid = false;
                        break;
                    }
                }
                else if (lineType === "closeBlockValidation")
                {
                    if(closeBlockValidation(lines,i))
                    {
                        let lineParsed = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed;
                        totalCommands++;
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][4]}`,i+1);
                        valid = false;
                        break;   
                    }
                }
                else if(lineType === "mustCondition")
                {
                    if(mustConditionValidation(lines,i))
                    {
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`
                        lineParsed += lines[i].trim() + (nonblockcmd ? '}' : '') + "\n";
                        codeParsed += lineParsed;
                        totalCommands++;
                        nonblockcmd = false;
                    }
                    else
                    {
                        let state = functionFilter[6].filter.test(lines[i].trim()) ? 'blue' : 'red';
                        let pos = predictFunction(lines,i);
                        badLuckFunctions += `badLuck([${pos[0]},${pos[1]}],'${state}')\n`;
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`
                        lineParsed += lines[i].trim() + (nonblockcmd ? '}' : '') + "\n";
                        codeParsed += lineParsed;
                        totalCommands++;
                        nonblockcmd = false;
                    }
                }
                else if(lineType === "loop")
                {
                    if(ifValidation(lines[i]))
                    {
                        let line = lines[i].trim();
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`            
                        lineParsed += `while${line.substring(line.indexOf('('))}{\n`;      
                        codeParsed += lineParsed;         
                        totalCommands++;
                        nonblockcmd = true;
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1);
                        valid = false;
                        break;
                    }
                }
                else if(lineType === "loop&&blockValidation")
                {
                    let validConditional = false;
                    if(blockValidation(lines,i))
                    {
                        if(ifValidation(lines[i]))
                        {
                            validConditional = true;          
                        }
                        else
                        {
                            printError(`${lines[i]} ${errorVariations[langSelector][2]}`,i+1);
                        }   
                    }
                    else
                    {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`,i+1);   
                    }

                    if(validConditional)
                    {
                        let line = lines[i].trim();
                        let lineParsed = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                        await delay(250);\n`
                        
                        let isEmpty = true;
                        for(let j = i; j < lines.length && !lines[j].includes('}'); j++){
                            if((lines[j] != '' && j!= i)){
                                isEmpty = false;
                                break;
                            }
                        }

                        if(isEmpty){
                            lineParsed += `while(true){break;`;
                        } else {
                            lineParsed += `while${line.substring(line.indexOf('('))}\n`;
                        }
                        codeParsed += lineParsed;  
                        totalCommands++;
                    }
                    else
                    {
                        valid = false;
                        break;
                    }
                }
                else
                {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                    await delay(250);\n`
                    lineParsed += lines[i].trim() + (nonblockcmd ? '}' : '') + "\n";
                    codeParsed += lineParsed;
                    totalCommands++;
                    nonblockcmd = false;
                }
            }
            else
            {
                printError(lines[i],i+1);
                valid = false;
                break;
            }

            if(limit > 0 && totalCommands > limit)
            {
                document.getElementById('consoleArea').innerText += `${errorVariations[langSelector][5]} ${limit} ${errorVariations[langSelector][6]}\n`;
                valid = false;
                break;
            }
        }
        else
        {
            continue;
        }
    }

    if(valid)
    {
        codeParsed += `}${badLuckFunctions}runCode()\n`;
        return codeParsed;
    }
    else
    {
        return null;
    }
}
