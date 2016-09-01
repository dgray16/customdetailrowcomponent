<%--
	Here you could do any styling job you want , all CSS stuff.
--%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

<%-- Detail --%>
.z-detailrow {
    height: 100%;
    width: 18px;
    padding: 0!important;
    overflow: hidden;
    white-space: nowrap;
}
.z-detailrow .z-detailrow-img {
    cursor:pointer;
    width: 100%;
    height: 18px;
    background: transparent no-repeat 4px 3px;
    background-image: url(${c:encodeURL('~./zul/img/grid/row-expand.png')});
}
.z-detailrow.z-detailrow-expd .z-detailrow-img {
    background-position: -13px 3px;
}
tr.z-row .z-detailrow-outer {
    background: #C6E8FC repeat-y left;
    border-top: none;
    border-left: 1px solid white;
    border-right: 1px solid #C0C0C0;
    border-bottom: 1px solid #D0D0D0;
    vertical-align: top;
    background-image: url(${c:encodeURL('~./zul/img/grid/detail-bg.png')});
