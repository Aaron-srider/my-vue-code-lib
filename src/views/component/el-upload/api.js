import request from '@/utils/request';//没有这个文件，需要自己写

export function uploadFiles(goodId, attachmentFormData) {
    return request({
        url: `/tempAdmin/uploadGoodPic/${goodId}`,
        method: 'post',
        data: attachmentFormData,
    });
}