function crackPropagation()
{
    //Initial Condition
    var KI = 0;
    // Define constant Variable
    var M = 1;
    var Mkm = 1;
    var Mkb = 1;
    var Qm = 0;
    var Qb = 0;

    // Define Input Variable
    var a = document.getElementById("crackLength").value;
    var B = document.getElementById("thickness").value;
    var W = document.getElementById("width").value;
    var km = document.getElementById("misalignment").value;
    var kt = document.getElementById("discontinuity").value;
    var Pm = document.getElementById("membrane").value;
    var Pb = document.getElementById("bending").value;
    var ktm = document.getElementById("membraneFactor").value;
    var ktb = document.getElementById("bendingFactor").value;
    var Qtm = document.getElementById("thermalMembrane").value;
    var Qtb = document.getElementById("thermalBending").value;
    var Sy = document.getElementById("yield").value;
    var tensileVal = document.getElementById("tensile").value;
    var E = document.getElementById("youngModulus").value;
    var v = document.getElementById("poissonRatio").value;
    var KmatVal = (document.getElementById("Kmat").value)*1000**0.5;
    var CVal = document.getElementById("C").value;
    var mVal = document.getElementById("m").value;
    var cycleVal = document.getElementById("cycle").value;
    
    // Iteration Calculation
    for (let i=1; (i<=cycleVal) && (KI<KmatVal); i++)
    {
        // Calculations based on BS 7910 Section M.3.2
        var crackProfile = document.getElementById('crackType').value;
        if (crackProfile == 'through') {
            
            Mm = 1.12 - 0.23*(a/W) + 10.6*(a/W)**2 - 21.7*(a/W)**3 + 30.4*(a/W)**4;
            Mb = Mm;
        }
        else {
            Mm = 1;
            Mb = 1;
        }
        
        fw = 1/((Math.cos(Math.PI*a/W))**0.5);
        YSp = M*fw*(ktm*Mkm*Mm*Pm + ktb*Mkb*Mb*(Pm*(km - 1)+Pb));
        YSs = Mm*Qm + Mb*Qb;
        YS = YSp + YSs;
        KI = YS*(Math.PI*a)**0.5;
        da = CVal*(KI**mVal);
        a_cc = a/1;
        calculationCycle = i;
        a = a_cc + da;
    }
    document.getElementById("cycleShow").innerHTML = calculationCycle;
    document.getElementById("cycleShow").style.color = "black";
    document.getElementById("stressIntensity").innerHTML = (KI/(1000**0.5)).toFixed(2);
    document.getElementById("crackLengthFinal").innerHTML = a.toFixed(2);
}

// Open Navigation
function openNav() {
    document.getElementById("mySideNav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
}

// Close Navigation
function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
    document.getElementById("content").style.marginLeft= "0";
}

// Open Toggle
function openTgl() {
    document.getElementById("toggle").style.width = "200px";
    document.getElementById("toggleButton").onclick = closeTgl;
}

// Close Toggle
function closeTgl() {
    document.getElementById("toggle").style.width = "0";
    document.getElementById("toggleButton").onclick = openTgl;
}

// Function for Changing Image based on Dropdown List
function changeImg() {
    var picture = document.getElementById('crackType').value;
    var crackImg = document.getElementById('crackImg');
    if (picture == "through") {crackImg.src = "image/throughCrackImage.png";}
    else {crackImg.src = "image/edgeCrackImage.png";}
} 
