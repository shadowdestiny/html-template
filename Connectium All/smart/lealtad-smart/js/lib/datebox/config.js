//DOCUMENTACION
//http://dev.jtsage.com/jQM-DateBox/doc/
$(document).ready(function(){
	// Datepicker formulario de perfil
	$('.datebox-1').datebox({
    mode: "flipbox",
    useButton: false,
    zindex:9999999
	});

	// Datepicker formulario de registro
	$('.datebox-2').datebox({
    mode: "flipbox",
    useButton: false,
    zindex:9999999
	});
});

// CONFIGURACION DE LEGUNAJE Y FORMATO
jQuery.extend(jQuery.jtsage.datebox.prototype.options.lang, {
    "es-ES": {
        setDateButtonLabel: "Aceptar", 
        setTimeButtonLabel: "Guardar Hora", 
        setDurationButtonLabel: "Guardar Duración", 
        todayButtonLabel: "Hoy", 
        titleDateDialogLabel: "Elija fecha", 
        titleTimeDialogLabel: "Elegir Hora", 
        daysOfWeek: [
	        "Domingo", 
	        "Lunes", 
	        "Martes", 
	        "Miércoles", 
	        "Jueves", 
	        "Viernes", 
	        "Sábado"
	      ], 
        daysOfWeekShort: [
	        "Do", 
	        "Lu", 
	        "Ma", 
	        "Mi", 
	        "Ju", 
	        "Vi", 
	        "Sa"
        ], 
        monthsOfYear: [
	        "Enero", 
	        "Febrero", 
	        "Marzo", 
	        "Abril", 
	        "Mayo", 
	        "Junio", 
	        "Julio", 
	        "Agosto", 
	        "Septiembre", 
	        "Octubre", 
	        "Noviembre", 
	        "Diciembre"
        ],
        monthsOfYearShort: [
	        "Ene", 
	        "Feb", 
	        "Mar", 
	        "Abr", 
	        "May", 
	        "Jun", 
	        "Jul", 
	        "Ago", 
	        "Sep", 
	        "Oct", 
	        "Nov", 
	        "Dic"
	      ], 
        durationLabel: ["Días", "Horas", "Minutos", "Segundos"], 
        durationDays: ["Día", "Días"],
        tooltip: "Abrir El Calendario", 
        nextMonth: "Mes Próximo", 
        prevMonth: "Mes Anterior", 
        timeFormat: 24, 
        headerFormat: "%A, %-d %B, %Y", 
        dateFieldOrder: ["d", "m", "y"], 
        timeFieldOrder: ["h", "i", "a"], 
        slideFieldOrder: ["y", "m", "d"], 
        dateFormat: "%d/%m/%Y", 
        useArabicIndic: !1, 
        isRTL: !1, 
        calStartDay: 0, 
        clearButton: "Borrar", 
        durationOrder: ["d", "h", "i", "s"], 
        meridiem: ["AM", "PM"], 
        timeOutput: "%l:%M %p", 
        durationFormat: "%Dd %DA, %Dl:%DM:%DS", 
        calDateListLabel: "Otras fechas", 
        calHeaderFormat: "%B %Y", 
        tomorrowButtonLabel: "Saltar al mañana"
    }
}

),
jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
    useLang: "es-ES"
}

);