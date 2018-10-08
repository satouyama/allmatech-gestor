import * as $ from "jquery";
declare var mApp: any;

export class Helpers {
    static loadStyles(tag, src) {
        if (Array.isArray(src)) {
            $.each(src, function(k, s) {
                $(tag).append($('<link/>').attr('href', s).attr('rel', 'stylesheet').attr('type', 'text/css'));
            });
        } else {
            $(tag).append($('<link/>').attr('href', src).attr('rel', 'stylesheet').attr('type', 'text/css'));
        }
    }

    static unwrapTag(element) {
        $(element).removeAttr('appunwraptag').unwrap();
    }

	/**
	 * Set title markup
	 * @param title
	 */
    static setTitle(title) {
        $('.m-subheader__title').text(title);
    }

	/**
	 * Breadcrumbs markup
	 * @param breadcrumbs
	 */
    static setBreadcrumbs(breadcrumbs) {
        if (breadcrumbs) $('.m-subheader__title').addClass('m-subheader__title--separator');

        let ul = $('.m-subheader__breadcrumbs');

        if ($(ul).length === 0) {
            ul = $('<ul/>').addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
                .append($('<li/>').addClass('m-nav__item')
                    .append($('<a/>').addClass('m-nav__link m-nav__link--icon')
                        .append($('<i/>').addClass('m-nav__link-icon la la-home'))));
        }

        $(ul).find('li:not(:first-child)').remove();
        $.each(breadcrumbs, function(k, v) {
            let li = $('<li/>').addClass('m-nav__item')
                .append($('<a/>').addClass('m-nav__link m-nav__link--icon').attr('routerLink', v.href).attr('title', v.title)
                    .append($('<span/>').addClass('m-nav__link-text').text(v.text)));
            $(ul).append($('<li/>').addClass('m-nav__separator').text('-')).append(li);
        });
        $('.m-subheader .m-stack__item:first-child').append(ul);
    }

    static setLoading(enable) {
        let body = $('body');
        if (enable) {
            $(body).addClass('m-page--loading-non-block')
        } else {
            $(body).removeClass('m-page--loading-non-block')
        }
    }

    static bodyClass(strClass) {
        $('body').attr('class', strClass);
    }

    static setBlockLoading(selector, enable: boolean, message: string = 'Carregando...') {
        if (enable) {
            mApp.block(selector, {
                overlayColor: "#000000",
                type: "loader",
                state: "primary",
                message: message
            });
        } else {
            mApp.unblock(selector);
        }
    }

    /* Separa os pedidos por status */
    static contarPedidos(ped, idDistribuidora) {
        let totalOrders = null;
        let deliveredOrders = null;
        let notDeliveredOrders = null;
        let canceledOrders = null;

        if (idDistribuidora == null && (ped != null && ped.length > 0)) {
            totalOrders = 0;
            deliveredOrders = 0;
            notDeliveredOrders = 0;
            canceledOrders = 0;
            for (let count in ped) {
                ++totalOrders;
                if (ped[count].statusPedidoUsuario == 9) {
                    ++canceledOrders;
                } else if (ped[count].statusPedidoEntregador == 7) {
                    ++deliveredOrders;
                } else if (ped[count].entregadorIdEntregador == null) {
                    ++notDeliveredOrders;
                } else if (ped[count].statusPedidoEntregador == 8) {
                    ++notDeliveredOrders;
                } else if (ped[count].statusPedidoEntregador == 2) {
                    ++notDeliveredOrders;
                }
            }
        } else if (ped != null && ped.length > 0) {
            totalOrders = 0;
            deliveredOrders = 0;
            notDeliveredOrders = 0;
            canceledOrders = 0;
            for (let count in ped) {
                if (ped[count].distribuidoraIdDistribuidora == idDistribuidora) {
                    ++totalOrders;
                    if (ped[count].statusPedidoUsuario == 9) {
                        ++canceledOrders;
                    } else if (ped[count].statusPedidoEntregador == 7) {
                        ++deliveredOrders;
                    } else if (ped[count].entregadorIdEntregador == null) {
                        ++notDeliveredOrders;
                    } else if (ped[count].statusPedidoEntregador == 8) {
                        ++notDeliveredOrders;
                    } else if (ped[count].statusPedidoEntregador == 2) {
                        ++notDeliveredOrders;
                    }
                }
            }
        }

        return {
            totalOrders: totalOrders == null ? "Carregando..." : totalOrders,
            deliveredOrders: deliveredOrders == null ? "Carregando..." : deliveredOrders,
            notDeliveredOrders: notDeliveredOrders == null ? "Carregando..." : notDeliveredOrders,
            canceledOrders: canceledOrders == null ? "Carregando..." : canceledOrders
        };
    };

}