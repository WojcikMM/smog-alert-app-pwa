using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SmogAlertAPI.Services;
using SmogAlertAPI.Services.Cache;
using SmogAlertAPI.Services.Jobs;
using AutoMapper;
using System.Reflection;
using SmogAlertAPI.Dto.External;

namespace SmogAlertAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      services.AddAutoMapper(Assembly.GetExecutingAssembly());

      services.AddMemoryCache();
      services.AddSwaggerGen();

      services.AddTransient<RefreshGiosRestDataJob>();
      services.AddTransient<NearestLocationService>();
      services.AddTransient<IAirQualityHttpClient, GiosHttptService>();
      services.AddTransient(typeof(ICacheStoreClient<ExternalAirIndexDto>), typeof(AirIndexCacheStoreClient));
      services.AddTransient(typeof(ICacheStoreClient<ExternalStationDto>), typeof(StationsCacheStoreClient));


      services.AddHostedService<RefreshGiosRestDataJob>();


    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseSwagger();

      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Smog Alert API V1");
        c.RoutePrefix = string.Empty;
      });

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
