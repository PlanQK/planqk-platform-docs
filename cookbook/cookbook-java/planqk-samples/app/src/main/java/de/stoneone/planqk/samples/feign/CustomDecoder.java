package de.stoneone.planqk.samples.feign;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.stoneone.planqk.api.invoker.ApiResponseDecoder;
import feign.Response;
import feign.Util;
import java.io.IOException;
import java.lang.reflect.Type;

/**
 * Custom decoder to monkey-patch the generated decoder class. This is required to support byte[] and String return types.
 */
public class CustomDecoder extends ApiResponseDecoder {

    public CustomDecoder(ObjectMapper mapper) {
        super(mapper);
    }

    @Override
    public Object decode(Response response, Type type) throws IOException {
        if (response.status() != 404 && response.status() != 204) {
            if (response.body() == null) {
                return null;
            }
            // decode byte arrays
            if (byte[].class.equals(type)) {
                return Util.toByteArray(response.body().asInputStream());
            }
            // decode strings
            if (String.class.equals(type)) {
                return Util.toString(response.body().asReader(Util.UTF_8));
            }
        } else {
            return Util.emptyValueOf(type);
        }
        return super.decode(response, type);
    }
}
