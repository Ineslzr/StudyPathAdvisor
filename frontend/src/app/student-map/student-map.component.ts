import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../services/data.service';
import statesData from './us-states.js';

@Component({
  selector: 'app-student-map',
  templateUrl: './student-map.component.html',
  styleUrls: ['./student-map.component.scss']
})
export class StudentMapComponent implements OnInit{


  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    var map = L.map('map').setView([37.8, -96], 4);
		let geojson: L.GeoJSON;
    let info : any;
    var legend = new L.Control({position: 'bottomright'});
    

    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    geojson = L.geoJson(statesData as any, {
      style: style,
      onEachFeature: onEachFeature
  }).addTo(map);

    function getColor(d : any) {
      return d > 2000  ? '#800026' :
            d > 1500  ? '#BD0026' :
             d > 1500  ? '#E31A1C' :
             d > 500  ? '#FC4E2A' :
             d > 200   ? '#FD8D3C' :
             d > 100   ? '#FEB24C' :
             d > 50   ? '#FED976' :
                        '#FFEDA0';
  }

  function style(feature : any) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };

  }
    function highlightFeature(e : any) {
      var layer = e.target;
  
      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
  
      layer.bringToFront();
      info.update(layer.feature.properties);
  }

  function resetHighlight(e : any) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e : any) {
    map.fitBounds(e.target.getBounds());
}

  function onEachFeature(feature : any , layer : any) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }

  info = new L.Control();
  info.onAdd = function (map : any) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
  };

  info.update = function (props : any) {
    this._div.innerHTML = '<h4>Nombre d\'étudiants</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' étudiants'
        : 'Aucune donnée');
  };

  info.addTo(map);


  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 100, 200, 500, 1000, 1500,2000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

    
}


}

