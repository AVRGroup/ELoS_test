const codeVariations = [
    [
        'andarFrente',
        'andarTras',
        'girarEsquerda',
        'girarDireita',
        'darMeiaVolta',
        'apagarFogo',
        'desativarLaserAzul',
        'desativarLaserVermelho',
        'girarManivela',
        'coletarCristal',
        'pegandoFogo',
        'laserAzulAtivo',
        'laserVermelhoAtivo',
        'portaFechada',
        'se',
        'senão',
        'enquanto'
    ],
    [
        'moveForward',
        'moveBackwards',
        'rotateLeft',
        'rotateRight',
        'turnBack',
        'extinguishFire',
        'disableBlueLaser',
        'disableRedLaser',
        'turnCrank',
        'collectCrystal',
        'isOnFire',
        'isBlueLaserActive',
        'isRedLaserActive',
        'isDoorClosed',
        'if',
        'else',
        'while'
    ]
];

export function convertCode(langSelector,code)
{
    if(langSelector == 0)
    {
        return code;
    }
    else
    {
        let codeConverted = code;
        for(let i = 0; i < codeVariations[langSelector].length; i++)
        {
            codeConverted = codeConverted.replaceAll(codeVariations[langSelector][i],codeVariations[0][i]);
        }

        return codeConverted;
    }
}