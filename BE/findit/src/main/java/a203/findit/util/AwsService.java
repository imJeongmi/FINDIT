package a203.findit.util;

import a203.findit.exception.CustomException;
import a203.findit.model.dto.res.Code;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class AwsService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;


    /**
     * s3에 올라간 주소값 return
     */
    public String imageUpload(MultipartFile multipartFile) {
        String originalName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
        long fileSize = multipartFile.getSize();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        String contentType = multipartFile.getContentType().split("/")[0].toLowerCase();
        if(!contentType.equals("image")){
            throw new CustomException(Code.C405);
        }
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(fileSize);

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, originalName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패");
        }

        return amazonS3Client.getResourceUrl(bucket, originalName);
    }

    public void fileDelete(String oldFileName) {
        amazonS3Client.deleteObject(bucket, oldFileName);
    }
}
