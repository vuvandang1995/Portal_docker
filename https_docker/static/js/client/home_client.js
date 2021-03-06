$(document).ready(function(){
    $('body .list_vm_client').each( function(){
        $(this).DataTable({
            "ajax": {
                "type": "GET",
                "url": "/client/home_data_",
                "contentType": "application/json; charset=utf-8",
                "data": function(result){
                    return JSON.stringify(result);
                },
            },
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "displayLength": 10,
        });
    });


    $("body").on('click', '.console', function(){
        var url = $(this).attr('id');
        window.open(url);
    });

    $("#snapshot").on('show.bs.modal', function(event){
        $("input[name=snapshotname]").val('');
    });

    $("#sshkey").on('show.bs.modal', function(event){
        $("input[name=sshkeyname]").val('');
        document.getElementById("close_modal").click();
    });

    $("#backup").on('show.bs.modal', function(event){
        $("input[name=backupname]").val('');
    });

    $("body").on('click', '.control', function(){
        var id = $(this).attr('id').split('_')[1];
        var action = $(this).attr('id').split('_')[0];
        var svname = $(this).attr('name');
        var token = $("input[name=csrfmiddlewaretoken]").val();
        if (action == 'snapshot'){
            $("body").on('click', '#snapshot_submit', function(){
                var snapshotname = $("input[name=snapshotname]").val();
                    swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                $.ajax({
                    type:'POST',
                    url:location.href,
                    data: {'snapshot':id, 'csrfmiddlewaretoken':token, 'svname': svname, 'snapshotname': snapshotname},
                    success: function(msg){
                        if (msg == 'Đã có lỗi xảy ra!'){
                            swal({
                                type: 'error',
                                title: msg,
                            });
                        }else{
                            document.getElementById("close_modal_snapshot").click();
                            swal.close();
                            $("body .snapshot_select").load(location.href + " .snapshot_select");
                        }
                    }
                });
            });
        }else if (action == 'resetpass'){
            $("body").on('click', '#resetpass_submit', function(){
                var pass = $("input[name=resetpass]").val();
                var pass2 = $("input[name=password2]").val();
                if (pass == pass2){
                    swal({
                        imageUrl: '/static/images/spinner-sample.gif',
                        imageHeight: 120,
                        imageAlt: 'wait',
                        title: "Please wait...",
                        title: "Please wait...",
                        showConfirmButton: false
                    });
                    $.ajax({
                        type:'POST',
                        url:location.href,
                        data: {'resetpass':id, 'csrfmiddlewaretoken':token, 'pass': pass},
                        success: function(msg){
                            if (msg == 'Đã có lỗi xảy ra!'){
                                swal({
                                    type: 'error',
                                    title: msg,
                                });
                            }else{
                                document.getElementById("close_modal_resetpass").click();
                                swal.close();
                            }
                        }
                    });
                }else{
                    swal({
                        type: 'warning',
                        title: "Mat khau khong trung khop",
                    });
                }
            });
        }else if (action == 'backup'){
            $("body").on('click', '#backup_submit', function(){
                var backupname = $("input[name=backupname]").val();
                var backup_type = document.getElementById("mySelect_backup_type").value;
                var rotation = $("input[name=rotation]").val();
                    swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                $.ajax({
                    type:'POST',
                    url:location.href,
                    data: {'backup':id, 'csrfmiddlewaretoken':token, 'svname': svname, 'backupname': backupname, 'backup_type': backup_type, 'rotation': rotation},
                    success: function(msg){
                        if (msg == 'Đã có lỗi xảy ra!'){
                            swal({
                                type: 'error',
                                title: msg,
                            });
                        }else{
                            document.getElementById("close_modal_backup").click();
                            swal.close();
                        }
                    }
                });
            });
        }else if (action == 'rebuild'){
            opsSocket.send(JSON.stringify({
                'message' : '10.10.10.99',
            }));
            $("body").on('click', '#rebuild_submit', function(){
                var image = document.getElementById("mySelect_image").value;
                var disk_partition = document.getElementById("mySelect_type").value;
                swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                $.ajax({
                    type:'POST',
                    url:location.href,
                    data: {'rebuild':id, 'csrfmiddlewaretoken':token, 'image': image, 'disk_partition': disk_partition},
                    success: function(msg){
                        if (msg == 'Đã có lỗi xảy ra!'){
                            swal({
                                type: 'error',
                                title: msg,
                            });
                        }else{
                            document.getElementById("close_modal_rebuild").click();
                            swal.close();
                        }
                    }
                });
            });
        }else if (action == 'sshkey'){
            $("body").on('click', '#sshkey_submit', function(){
                var sshkeyname = $("input[name=sshkeyname]").val();
                swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                $.ajax({
                    type:'POST',
                    url:location.href,
                    data: {'sshkeyname':sshkeyname, 'csrfmiddlewaretoken':token},
                    success: function(msg){
                        if ((msg == 'Đã có lỗi xảy ra!') || (msg == 'Tên ssh key đã tồn tại!')){
                            swal({
                                type: 'error',
                                title: msg,
                            });
                        }else{
                            document.getElementById("close_modal_sshkey").click();
                            swal.close();
                            $("body .sshkey_select").load(location.href + " .sshkey_select");
                        }
                    }
                });
            });
        }else{
            swal({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(function(result){
                if(result.value){
                    if (action == 'del'){
                        swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                        $.ajax({
                            type:'POST',
                            url:location.href,
                            data: {'delete':id, 'csrfmiddlewaretoken':token, 'svname': svname},
                            success: function(msg){
                                if (msg == 'Đã có lỗi xảy ra!'){
                                    swal({
                                        type: 'error',
                                        title: msg,
                                    });
                                }else{
                                    // swal.close();
                                    // opsSocket.send(JSON.stringify({
                                    //     'message' : msg,
                                    // }));
                                    setTimeout(function(){
                                        $('.list_vm_client').DataTable().ajax.reload(null,false);
                                        swal.close();
                                    }, 3000);
                                }
                            }
                        });
                    }else if (action == 'start'){
                        swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                        $.ajax({
                            type:'POST',
                            url:location.href,
                            data: {'start':id, 'csrfmiddlewaretoken':token, 'svname': svname},
                            success: function(msg){
                                if (msg == 'Đã có lỗi xảy ra!'){
                                    swal({
                                        type: 'error',
                                        title: msg,
                                    });
                                }else{
                                    setTimeout(function(){
                                        $('.list_vm_client').DataTable().ajax.reload(null,false);
                                        swal.close();
                                    }, 4000);
                                }
                            }
                        });
                    }else if (action == 'reboot'){
                        swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                        $.ajax({
                            type:'POST',
                            url:location.href,
                            data: {'reboot':id, 'csrfmiddlewaretoken':token, 'svname': svname},
                            success: function(msg){
                                if (msg == 'Đã có lỗi xảy ra!'){
                                    swal({
                                        type: 'error',
                                        title: msg,
                                    });
                                }else{
                                    setTimeout(function(){
                                        $('.list_vm_client').DataTable().ajax.reload(null,false);
                                        swal.close();
                                    }, 4000);
                                }
                            }
                        });
                    }else if (action == 'hardreboot'){
                        swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                        $.ajax({
                            type:'POST',
                            url:location.href,
                            data: {'hardreboot':id, 'csrfmiddlewaretoken':token},
                            success: function(msg){
                                if (msg == 'Đã có lỗi xảy ra!'){
                                    swal({
                                        type: 'error',
                                        title: msg,
                                    });
                                }else{
                                    setTimeout(function(){
                                        $('.list_vm_client').DataTable().ajax.reload(null,false);
                                        swal.close();
                                    }, 4000);
                                }
                            }
                        });
                    }else if (action == 'stop'){
                        swal({
                            imageUrl: '/static/images/spinner-sample.gif',
                            imageHeight: 120,
                            imageAlt: 'wait',
                            title: "Please wait...",
                            title: "Please wait...",
                            showConfirmButton: false
                        });
                        $.ajax({
                            type:'POST',
                            url:location.href,
                            data: {'stop':id, 'csrfmiddlewaretoken':token, 'svname': svname},
                            success: function(msg){
                                if (msg == 'Đã có lỗi xảy ra!'){
                                    swal({
                                        type: 'error',
                                        title: msg,
                                    });
                                }else{
                                    setTimeout(function(){
                                        $('.list_vm_client').DataTable().ajax.reload(null,false);
                                        swal.close();
                                    }, 4000);
                                }
                            }
                        });
                    }
                }
            })

            
        }
    });
    function numberWithCommas(x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    var money = $('.money').text().split(' VND')[0];
    money = numberWithCommas(money);
    $('.money').children().text(money + ' VND');

    $("#mySelect_image").select2({
        templateResult: formatState
    });

    $("#mySelect").select2({
        templateResult: formatState
    });
    
    function formatState (state) {
        if (!state.id) { return state.text; }
        var $state = $(
        '<span>' + state.text + '</span>'
        );
        return $state;
    }

});